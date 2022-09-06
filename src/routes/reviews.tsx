import { Params } from '@solidjs/router'
import { createMemo, For, Show } from 'solid-js'
import { Title, useRouteData, useSearchParams } from 'solid-start'
import { createServerData } from 'solid-start/server'
import ReviewCard from '~/components/reviews/ReviewCard'
import { MY_EMAIL, PAGE_SIZE } from '~/constants'
import { Reviews } from '~/types/review'
import { watchDirectory } from '~/utils'

const allReviews = await watchDirectory(
  '/home/smores/pCloudDrive/reviews/',
  Reviews
)
const flatReviews = createMemo(async () => {
  return allReviews().flatMap((review) =>
    'length' in review ? review : [review]
  )
})

export function routeData() {
  return createServerData(async () => {
    return await flatReviews()
  })
}

export default function ReviewsPage() {
  const reviews = useRouteData<typeof routeData>()

  const [searchParams, setSearchParams] = useSearchParams()
  const page = createMemo(() =>
    searchParams.page ? parseInt(searchParams.page) : null
  )

  const visibleReviews = createMemo(() => {
    return (reviews() || []).filter((review) => {
      if (searchParams.year && review.year !== parseInt(searchParams.year)) {
        return false
      }
      if (!review.title.includes(searchParams.title || '')) {
        return false
      }
      if (
        searchParams.minRating &&
        (review.rating || 0) >= parseInt(searchParams.minRating)
      ) {
        return false
      }
      if (searchParams.reviewed) {
        const reviewed =
          !!review.review || (review.rating !== 0 && !!review.rating)
        if (
          (searchParams.reviewed === 'true' && !reviewed) ||
          (searchParams.reviewed === 'false' && reviewed)
        ) {
          return false
        }
      }

      return true
    })
  })

  const pageCount = createMemo(() => visibleReviews().length / PAGE_SIZE)

  return (
    <main>
      <Title>Reviews</Title>

      <header>
        <h1>Reviews</h1>
        <p>
          What GeoCities page would be complete without brash public opinions?
          Here you'll find a rolling list of (mostly) everything I've watched
          and remembered well enough to opine on, as well as (mostly) everything
          that I haven't seen but would like to at some point. If there's
          something missing from here,
          <a href={MY_EMAIL}>let me know</a>
          that you wanna know what I think and I can throw a dart at the
          proverbial board, so to say.
        </p>
      </header>

      <FilterReviews params={searchParams} setParams={setSearchParams} />

      <Show when={visibleReviews.length > 0}>
        <div>
          <ReviewCount
            page={page() || 0}
            pageCount={pageCount()}
            visibleReviews={visibleReviews()}
          />
          {pageCount() > 1 && (
            <PageControls
              pageCount={visibleReviews.length / PAGE_SIZE}
              page={searchParams.page ? parseInt(searchParams.page) : 0}
              goToPage={(page) => setSearchParams({ ...searchParams, page })}
            />
          )}
          <For each={visibleReviews()}>
            {(review) => <ReviewCard review={review} />}
          </For>

          {pageCount() > 1 && (
            <footer>
              <PageControls
                pageCount={visibleReviews.length / PAGE_SIZE}
                page={searchParams.page ? parseInt(searchParams.page) : 0}
                goToPage={(page) => {
                  setSearchParams({ ...searchParams, page })
                  // setTimeout(() => {
                  //   window.scrollTo(0, document.body.scrollHeight);
                  // }, 10)
                }}
              />
            </footer>
          )}
        </div>
      </Show>

      <Show when={visibleReviews.length === 0}>
        <p>
          <i>
            {visibleReviews().length === 0 && (reviews() || []).length > 0
              ? 'No reviews found for the given query.'
              : 'No reviews available.'}
          </i>
        </p>
      </Show>
    </main>
  )
}

function ReviewCount(props: {
  page: number
  pageCount: number
  visibleReviews: any[]
}) {
  return (
    <strong>
      {props.pageCount > 1 && (
        <>
          showing reviews
          {(props.page - 1) * PAGE_SIZE + 1}
          to
          {Math.min(props.page * PAGE_SIZE, props.visibleReviews.length)}
          of
        </>
      )}
      <span>
        {`${props.visibleReviews.length} review${props.visibleReviews.length === 1 ? '' : 's'
          }`}
        found:
      </span>
    </strong>
  )
}

function FilterReviews(props: {
  params: Params
  setParams: (params: Params) => void
}) {
  return (
    <fieldset>
      <legend>Filter Reviews</legend>
      <div class="form-control-group">
        <div class="form-control grow-3x">
          <label>
            By Title
            <input
              type="text"
              placeholder="Shrek"
              value={props.params.title || ''}
              onInput={(event) =>
                props.setParams({
                  ...props.params,
                  title: event.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div class="form-control">
          <label>Reviewed?</label>
          {props.params.reviewed === 'true' ? (
            <button
              onClick={() =>
                props.setParams({ ...props.params, reviewed: 'true' })
              }
            >
              All Movies
            </button>
          ) : props.params.reviewed === 'false' ? (
            <button
              onClick={() =>
                props.setParams({ ...props.params, reviewed: 'false' })
              }
            >
              Only Reviewed
            </button>
          ) : (
            <button
              onClick={() => props.setParams({ ...props.params, reviewed: '' })}
            >
              Only Unreviewed
            </button>
          )}
        </div>
      </div>
      <div class="form-control-group">
        <div class="form-control">
          <label>
            By Release Year
            <input
              type="number"
              placeholder="2099"
              value={props.params.year || ''}
              onInput={(event) =>
                props.setParams({
                  ...props.params,
                  year: event.currentTarget.value || undefined,
                })
              }
            />
          </label>
        </div>
        <div class="form-control">
          <label>
            By Minimum Rating
            <input
              type="number"
              min="0"
              max="10"
              placeholder="6/10"
              value={props.params.minRating || ''}
              onInput={(event) =>
                props.setParams({
                  ...props.params,
                  minRating: event.currentTarget.value || undefined,
                })
              }
            />
          </label>
        </div>
      </div>
    </fieldset>
  )
}

function PageControls(props: {
  page: number
  pageCount: number
  goToPage: (page: number) => void
}) {
  return (
    <ul class="pagination">
      <li>
        <a
          class={props.page === 1 ? 'active' : ''}
          onClick={() => props.goToPage(1)}
        >
          First
        </a>
      </li>
      <Show when={props.page > 1}>
        <li>
          <a onClick={() => props.goToPage(props.page - 1)}>{props.page - 1}</a>
        </li>
      </Show>
      <li>
        <a class="active">{props.page}</a>
      </li>
      <Show when={props.page < props.pageCount}>
        <li>
          <a onClick={() => props.goToPage(props.page + 1)}>{props.page + 1}</a>
        </li>
      </Show>
      <li>
        <a
          class={props.page === props.pageCount ? 'active' : ''}
          onClick={() => props.goToPage(props.pageCount)}
        >
          Last
        </a>
      </li>
    </ul>
  )
}
