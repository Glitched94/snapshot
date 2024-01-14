import {
  Item,
  bufferToFile,
  equippedItem,
  fileToBuffer,
  getCampground,
  getCloset,
  getDisplay,
  getInventory,
  getStorage,
  myClosetMeat,
  myMeat,
  myName,
  myStorageMeat,
  toItem,
  todayToString,
  totalTurnsPlayed,
} from "kolmafia";
import { $item, $items, $slots, getFoldGroup } from "libram";
import {
  ItemDetail,
  ItemResult,
  MeatPerAdventureAnalysis,
} from "libram/dist/session";
import { sum } from "libram/dist/utils";

function getEquipment(): { [item: string]: number } {
  const equippedItems: { [item: string]: number } = {};

  $slots``.forEach((slot) => {
    const item = equippedItem(slot);
    if (item !== $item.none) {
      equippedItems[item.name] = 1;
    }
  });

  return equippedItems;
}

/**
 * Return a mapping of inventory items, mapping foldable items to a single of their forms
 *
 * @param inventoryOnly should closet, DC, and storage be ignore for the inventory calculations
 * @return the inventory results, with foldables mapped to a single of their folding forms
 */
function mySnapshotItemsWrapper(inventoryOnly = false): Map<Item, number> {
  const manyToOne = (primary: Item, mapped: Item[]): [Item, Item][] =>
    mapped.map((target: Item) => [target, primary]);

  const foldable = (item: Item): [Item, Item][] =>
    manyToOne(item, getFoldGroup(item));

  const itemMappings = new Map<Item, Item>([
    ...foldable($item`liar's pants`),
    ...foldable($item`ice pick`),
    ...manyToOne($item`Spooky Putty sheet`, [
      $item`Spooky Putty monster`,
      ...getFoldGroup($item`Spooky Putty sheet`),
    ]),
    ...foldable($item`stinky cheese sword`),
    ...foldable($item`naughty paper shuriken`),
    ...foldable($item`Loathing Legion knife`),
    ...foldable($item`deceased crimbo tree`),
    ...foldable($item`makeshift turban`),
    ...foldable($item`turtle wax shield`),
    ...foldable($item`metallic foil bow`),
    ...foldable($item`ironic moustache`),
    ...foldable($item`bugged balaclava`),
    ...foldable($item`toggle switch (Bartend)`),
    ...foldable($item`mushroom cap`),
    ...manyToOne($item`can of Rain-Doh`, $items`empty Rain-Doh can`),
    ...manyToOne(
      $item`meteorite fragment`,
      $items`meteorite earring, meteorite necklace, meteorite ring`,
    ),
    ...manyToOne(
      $item`Sneaky Pete's leather jacket`,
      $items`Sneaky Pete's leather jacket (collar popped)`,
    ),
    ...manyToOne($item`Boris's Helm`, $items`Boris's Helm (askew)`),
    ...manyToOne(
      $item`Jarlsberg's pan`,
      $items`Jarlsberg's pan (Cosmic portal mode)`,
    ),
    ...manyToOne(
      $item`tiny plastic sword`,
      $items`grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo`,
    ),
    ...manyToOne(
      $item`earthenware muffin tin`,
      $items`blueberry muffin, bran muffin, chocolate chip muffin`,
    ),
    ...manyToOne($item`ChibiBuddy™ (on)`, $items`ChibiBuddy™ (off)`),
  ]);

  const inventory = new Map<Item, number>();
  const invLocations = inventoryOnly
    ? [getInventory, getEquipment]
    : [getInventory, getEquipment, getCloset, getDisplay, getStorage];

  for (const inventoryFunc of invLocations) {
    for (const [itemStr, quantity] of Object.entries(inventoryFunc())) {
      const item = toItem(itemStr);
      const mappedItem = itemMappings.get(item) ?? item;
      inventory.set(mappedItem, quantity + (inventory.get(mappedItem) ?? 0));
    }
  }

  for (const [itemStr, quantity] of Object.entries(getCampground())) {
    const item = toItem(itemStr);
    if (item === $item`big rock`) continue; // Used to represent an empty house slot
    const mappedItem = itemMappings.get(item) ?? item;
    inventory.set(mappedItem, quantity + (inventory.get(mappedItem) ?? 0));
  }

  return inventory;
}

/**
 * Perform a binary element-wise operation on two inventories
 *
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op an operator to compute between the sets
 * @returns a new map representing the combined inventories
 */
function inventoryOperation(
  a: Map<Item, number>,
  b: Map<Item, number>,
  op: (aPart: number, bPart: number) => number,
): Map<Item, number> {
  // return every entry that is in a and not in b
  const difference = new Map<Item, number>();

  for (const item of new Set([...a.keys(), ...b.keys()])) {
    difference.set(item, op(a.get(item) ?? 0, b.get(item) ?? 0));
  }

  const diffEntries: [Item, number][] = [...difference.entries()];

  return new Map<Item, number>(diffEntries.filter(([, value]) => value !== 0));
}

export class Snapshot {
  meat: number;
  items: Map<Item, number>;
  totalTurns: number;
  timestamp: Date;
  /**
   * Construct a new Snapshot
   *
   * @param meat the amount of meat associated with this inventory
   * @param items the items associated with this inventory
   * @param totalTurns the number of turns associated with this inventory
   */
  private constructor(
    meat: number,
    items: Map<Item, number>,
    totalTurns: number,
    timestamp?: Date
  ) {
    this.meat = meat;
    this.items = items;
    this.totalTurns = totalTurns;
    this.timestamp = timestamp ?? new Date();
  }

  /**
   * Register inventory results that do not get tracked natively
   *
   * @param target either the Item or a string saying "meat" of what quantity to modify
   * @param quantity How much to modify the tracked amount by
   */
  register(target: Item | "meat", quantity: number) {
    if (target === "meat") {
      this.meat += quantity;
    } else {
      this.items.set(target, (this.items.get(target) ?? 0) + quantity);
    }
  }

  /**
   * Value this Snapshot
   *
   * @param itemValue a function that, when given an item, will give a meat value of the item
   * @returns ItemResult with the full value of this session given the input function
   */
  value(itemValue: (item: Item) => number): ItemResult {
    const turns = this.totalTurns;
    const meat = Math.floor(this.meat);
    const itemDetails = [...this.items.entries()].map(([item, quantity]) => {
      return { item, quantity, value: itemValue(item) * quantity };
    });
    const items = Math.floor(sum(itemDetails, "value"));

    return { meat, items, total: meat + items, itemDetails, turns };
  }

  /**
   * Subtract the contents of another Snapshot from this one, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a)
   *
   * @param other the Snapshot from which to pull values to remove from this Snapshot
   * @returns a new Snapshot representing the difference between this Snapshot and the other Snapshot
   */
  diff(other: Snapshot): Snapshot {
    const timeDiff = this.timestamp.getTime() - other.timestamp.getTime();
    return new Snapshot(
      this.meat - other.meat,
      inventoryOperation(
        this.items,
        other.items,
        (a: number, b: number) => a - b,
      ),
      this.totalTurns - other.totalTurns,
      new Date(timeDiff)
    );
  }

  /**
   * Subtract the contents of snapshot b from snapshot a, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a)
   *
   * @param a the Snapshot from which to subtract elements
   * @param b the Snapshot from which to add elements
   * @returns a new Snapshot representing the difference between a and b
   */
  static diff(a: Snapshot, b: Snapshot): Snapshot {
    return a.diff(b);
  }

  static getFilepath(filename: string): string {
    return filename.endsWith(".json")
      ? filename
      : `snapshots/${myName()}/${todayToString()}_${filename}.json`;
  }

  /**
   * Export this Snapshot to a file in the data/ directory. Conventionally this file should end in ".json"
   *
   * @param filename The file into which to export
   */
  toFile(filename: string): void {
    const val = {
      meat: this.meat,
      items: Object.fromEntries(this.items),
      totalTurns: this.totalTurns,
      timestamp: this.timestamp.toJSON()
    };
    bufferToFile(JSON.stringify(val), Snapshot.getFilepath(filename));
  }

  /**
   * Import a Snapshot from a file in the data/ directory. Conventionally the file should end in ".json"
   *
   * @param filename The file from which to import
   * @returns the Snapshot represented by the file
   */
  static fromFile(filename: string): Snapshot {
    const fileValue = fileToBuffer(Snapshot.getFilepath(filename));
    // fileToBuffer returns empty string for files that don't exist
    if (fileValue.length > 0) {
      const val: {
        meat: number;
        items: { [item: string]: number };
        totalTurns?: number;
        timestamp: string
      } = JSON.parse(fileValue);

      const parsedItems: [Item, number][] = Object.entries(val.items).map(
        ([itemStr, quantity]) => [toItem(itemStr), quantity],
      );

      return new Snapshot(
        val.meat,
        new Map<Item, number>(parsedItems),
        val.totalTurns ?? 0,
        new Date(val.timestamp)
      );
    } else {
      // if the file does not exist, return an empty Snapshot
      return new Snapshot(0, new Map<Item, number>(), 0);
    }
  }

  /**
   * Return the meat and items for the current Snapshot
   *
   * @param inventoryOnly should closet, DC, and storage be ignored for the Snapshot calculation
   * @returns current Snapshot
   */
  static current(inventoryOnly = false): Snapshot {
    const meat = inventoryOnly
      ? [myMeat]
      : [myMeat, myClosetMeat, myStorageMeat];
    return new Snapshot(
      sum(meat, (f) => f()),
      mySnapshotItemsWrapper(inventoryOnly),
      totalTurnsPlayed(),
    );
  }

  /**
   * @param baseline the base Snapshot to use when computing MPA
   * @param full the full Snapshot to use when computing MPA
   * @param options options for computing MPA
   * @param options.value a function to compute the meat value of a given item
   * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
   * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
   * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
   * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
   * @returns an analysis of the effective MPA for the given Snapshots
   */
  static computeMPA(
    baseline: Snapshot,
    full: Snapshot,
    options: {
      value: (item: Item) => number;
      isOutlier?: (item: ItemDetail) => boolean;
      excludeValue?: { meat?: number; item?: number };
    },
  ): MeatPerAdventureAnalysis {
    const value = options.value;
    const excludeValue = options.excludeValue ?? { meat: 0, item: 0 };
    const isOutlier = options.isOutlier;
    const result = full.diff(baseline).value(value);
    const meatValue = result.meat - (excludeValue.meat ?? 0);
    const outlierItems = isOutlier ? result.itemDetails.filter(isOutlier) : [];
    const outliersValue = sum(outlierItems, (detail) => detail.value);
    const itemValue = result.items - outliersValue - (excludeValue.item ?? 0);
    const { turns } = result;

    return {
      mpa: {
        effective: (meatValue + itemValue) / turns,
        total: (meatValue + itemValue + outliersValue) / turns,
        meat: meatValue / turns,
        items: itemValue / turns,
      },
      values: {
        effective: meatValue + itemValue,
        total: meatValue + itemValue + outliersValue,
        meat: meatValue,
        items: itemValue,
      },
      outlierItems: outlierItems,
      turns: turns,
    };
  }

  /**
   * @param other the Snapshot to diff against this Snapshot when computing MPA
   * @param options options for computing MPA
   * @param options.value a function to compute the meat value of a given item
   * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
   * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
   * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
   * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
   * @returns an analysis of the effective MPA for the given session
   */
  computeMPA(
    other: Snapshot,
    options: {
      value: (item: Item) => number;
      isOutlier?: (item: ItemDetail) => boolean;
      excludeValue?: { meat?: number; item?: number };
    },
  ): MeatPerAdventureAnalysis {
    return Snapshot.computeMPA(this, other, options);
  }
}
