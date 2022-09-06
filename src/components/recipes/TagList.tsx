import { For, mergeProps } from "solid-js";

export default function TagList(props: {
  tags: string[],
  selected: string[],
  toggle: (tag: string) => void,
  rightAlign?: boolean,
}) {
  const merged = mergeProps(props, { rightAlign: false });

  return (
    <ul class={`tags ${merged.rightAlign ? 'right' : ''}`}>
      <For each={merged.tags}>
        {tag => (
          <li
            class={`tag tag-rounded${merged.selected.includes(tag) ? ' tag-green' : ''}`}
            onClick={() => merged.toggle(tag)}>
            {tag}
          </li>
        )}
      </For>
    </ul>
  )
}