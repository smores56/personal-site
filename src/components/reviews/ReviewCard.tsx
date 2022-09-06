import { createMemo, For, Show } from 'solid-js'
import type { Review } from '~/types/review'

export default function ReviewCard(props: {
  review: typeof Review['_output']
}) {
  const reviewLines = createMemo(() =>
    (props.review.review || '').split(/\n/).filter((line) => line)
  )
  const starsClass = createMemo(
    () =>
      `stars-container tooltip stars-${
        Math.round((props.review.rating || 0) * 2) * 5
      }`
  )

  return (
    <article>
      <h3 class="card-title">
        {props.review.link ? (
          <a class="title-link" href={props.review.link}>
            {props.review.title}
          </a>
        ) : (
          <span>{props.review.title}</span>
        )}

        <Show when={props.review.year}>({props.review.year})</Show>
      </h3>

      <Show
        when={props.review.rating !== null || props.review.review}
        fallback={<i>Not Yet Rated</i>}
      >
        <Show when={props.review.rating}>
          <span class={starsClass()}>
            ★★★★★★★★★★
            <span class="tooltip-text">{props.review.rating} out of 10</span>
          </span>
        </Show>

        <For each={reviewLines()}>{(line) => <p>{line}</p>}</For>
      </Show>
    </article>
  )
}
