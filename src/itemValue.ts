import {
  Item,
  autosellPrice,
  getRelated,
  historicalAge,
  historicalPrice,
  isNpcItem,
  mallPrice,
  myHash,
  npcPrice,
  toItem,
} from "kolmafia";
import { $item, $items, sum } from "libram";

export function itemValue(item: Item): number {
  switch (item) {
    case $item`Mob Penguin cellular phone`:
      return 0;
    case $item`Loathing Idol Microphone (75% charged)`:
      return 0.75 * itemValue($item`Loathing Idol Microphone`);
    case $item`Loathing Idol Microphone (50% charged)`:
      return 0.5 * itemValue($item`Loathing Idol Microphone`);
    case $item`Loathing Idol Microphone (25% charged)`:
      return 0.25 * itemValue($item`Loathing Idol Microphone`);
  }

  function specialValue(item: Item) {
    switch (item) {
      case $item`Spooky Putty monster`:
        return itemValue($item`Spooky Putty sheet`);
      case $item`empty Rain-Doh can`:
        return itemValue($item`can of Rain-Doh`);
      case $item`coffee pixie stick`:
        return itemValue($item`Game Grid ticket`) * 10;
      case $item`roll of Hob-Os`:
        return (
          4.5 *
          averageValue(
            $items`sterno-flavored Hob-O, frostbite-flavored Hob-O, fry-oil-flavored Hob-O, strawberry-flavored Hob-O, garbage-juice-flavored Hob-O`,
          )
        );
      case $item`BRICKO brick`:
        return 90;
      case $item`BRICKO trunk`:
        return (
          5 * itemValue($item`BRICKO brick`) +
          itemValue($item`BRICKO eye brick`) / 10
        );
      case $item`d4`:
        return 2.5 * itemValue($item`generic restorative potion`);
      case $item`d6`:
        return 3.5 * itemValue($item`generic mana potion`);
      case $item`d8`:
        return 4.5 * itemValue($item`generic healing potion`);
      case $item`bag of park garbage`:
        return 200;
      case $item`Gathered Meat-Clip`:
        return 520;
      case $item`1,970 carat gold`:
        return 20500;
      case $item`unfinished ice sculpture`:
        return (
          3 * itemValue($item`snow berries`) + 3 * itemValue($item`ice harvest`)
        );
      case $item`fake hand`:
        return 50000;

      // Mushroom Prices
      case $item`free-range mushroom`:
        return 3 * itemValue($item`mushroom filet`);
      case $item`plump free-range mushroom`:
        return (
          itemValue($item`free-range mushroom`) +
          3 * itemValue($item`mushroom filet`)
        );
      case $item`bulky free-range mushroom`:
        return (
          itemValue($item`plump free-range mushroom`) +
          3 * itemValue($item`mushroom filet`)
        );
      case $item`giant free-range mushroom`:
        return (
          itemValue($item`bulky free-range mushroom`) +
          itemValue($item`mushroom slab`)
        );
      case $item`immense free-range mushroom`:
        return (
          itemValue($item`giant free-range mushroom`) +
          itemValue($item`mushroom slab`)
        );
      case $item`colossal free-range mushroom`:
        return (
          itemValue($item`immense free-range mushroom`) +
          itemValue($item`house-sized mushroom`)
        );

      // Untradable Currency Prices
      case $item`Freddy Kruegerand`:
        return (
          (0.95 *
            Math.max(
              itemValue($item`bottle of Bloodweiser`),
              itemValue($item`electric Kool-Aid`),
            )) /
          200
        );
      case $item`FunFunds™`:
        return itemValue($item`one-day ticket to Dinseylandfill`) / 20;
      case $item`Beach Buck`:
        return itemValue($item`one-day ticket to Spring Break Beach`) / 100;
      case $item`Volcoino`:
        return itemValue($item`one-day ticket to That 70s Volcano`) / 3;
      case $item`Coinspiracy`:
        return itemValue($item`one-day ticket to Conspiracy Island`) / 100;
      case $item`Wal-Mart gift certificate`:
        return itemValue($item`one-day ticket to The Glaciest`) / 50;

      default:
        if (npcPrice(item) > 0) {
          return npcPrice(item);
        }
        return 0;
    }
  }

  function singularValue(item: Item): number {
    const minValue = specialValue(item);

    if (recentPrice(item) <= Math.max(100, 2 * autosellPrice(item)))
      return Math.max(minValue, autosellPrice(item));

    return Math.max(minValue, recentPrice(item));
  }

  let maxValue = singularValue(item);
  if (getRelated(item, "zap").length > 0) {
    for (const j in getRelated(item, "zap"))
      maxValue = Math.min(maxValue, singularValue(toItem(j)));
  }

  return maxValue;
}

function averageValue(itemList: Item[]): number {
  if (itemList.length === 0) return 0;

  return sum(itemList, (i) => itemValue(i)) / itemList.length;
}

function recentPrice(item: Item): number {
  if (!item.tradeable) return 0;

  if (historicalAge(item) < 7.0) return historicalPrice(item) * 0.9;

  if (mallPrice(item) > 0) return mallPrice(item) * 0.9;

  if (mallPrice(item) < 0 && myHash() !== "") {
    if (isNpcItem(item)) return 0;

    if (historicalAge(item) < 4015) return historicalPrice(item) * 0.9;

    return 1000000000;
  }

  throw `No idea how to price item: ${item}`;
}
