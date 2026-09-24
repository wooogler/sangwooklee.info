import dayjs from "dayjs";
import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect, useState } from "react";

type Trip = {
  event: string;
  place: string;
  start: string;
  end: string;
  url?: string | null;
};

const formatRange = (start: string, end: string) => {
  const s = dayjs(start);
  const e = dayjs(end);
  if (s.isSame(e, "day")) return s.format("MMM D");
  if (s.isSame(e, "month")) return `${s.format("MMM D")}–${e.format("D")}`;
  return `${s.format("MMM D")}–${e.format("MMM D")}`;
};

type Props = { compact?: boolean };

const Travel = ({ compact }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { title: { eq: "travel" } }) {
        frontmatter {
          trips {
            event
            place
            start
            end
            url
          }
        }
      }
    }
  `);

  // Past/upcoming depends on the visitor's date, not the build date, so it is
  // resolved after hydration; the build-time date is only the first paint.
  const [today, setToday] = useState(dayjs().format("YYYY-MM-DD"));
  useEffect(() => setToday(dayjs().format("YYYY-MM-DD")), []);

  const trips: Trip[] = [...(data.markdownRemark?.frontmatter?.trips ?? [])].sort(
    (a: Trip, b: Trip) => a.start.localeCompare(b.start)
  );
  const past = trips.filter((trip) => trip.end < today);
  const upcoming = trips.filter((trip) => trip.end >= today);
  const shown = [...past.slice(-1), ...upcoming].reverse();

  if (shown.length === 0) return null;

  return (
    <div>
      <div className={compact ? 'mt-3 space-y-2' : 'mt-1.5 space-y-1'}>
        {shown.map((trip) => {
          const isPast = trip.end < today;
          const isNow = trip.start <= today && today <= trip.end;
          const event = trip.url ? (
            <a
              href={trip.url}
              target='_blank'
              rel='noreferrer noopener'
              className='hover:text-blue-600 underline decoration-slate-300'
            >
              {trip.event}
            </a>
          ) : (
            trip.event
          );

          const label = (
            <>
              {event} · {trip.place}
              {isNow && (
                <span className='ml-1.5 px-1.5 py-0.5 text-xs rounded bg-green-100 text-green-700'>
                  Now
                </span>
              )}
            </>
          );

          if (!compact) {
            return (
              <div
                key={`${trip.event}-${trip.start}`}
                className={`flex flex-col xl:flex-row xl:items-baseline xl:justify-between xl:gap-2 text-[13px] ${
                  isPast ? "text-slate-400" : ""
                }`}
              >
                <span>{label}</span>
                <span className='text-xs italic text-gray-400 whitespace-nowrap'>
                  {formatRange(trip.start, trip.end)}
                </span>
              </div>
            );
          }

          return (
            <div
              key={`${trip.event}-${trip.start}`}
              className={`flex gap-4 text-sm ${isPast ? "text-slate-400" : ""}`}
            >
              <span
                className={`w-[4.5rem] flex-shrink-0 ${
                  isPast ? "" : "text-slate-500"
                }`}
              >
                {formatRange(trip.start, trip.end)}
              </span>
              <span className={isPast ? "" : "text-slate-800"}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Travel;
