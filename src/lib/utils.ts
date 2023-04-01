export function toggleInList<T>(items: T[], item: T): T[] {
  if (items.includes(item)) {
    return items.filter(i => i !== item);
  } else {
    return [...items, item];
  }
}
