import Link from "next/link";
import { ArrowUpRight, MoveDown } from "lucide-react";
import { articles } from "@/data/france";

export default function ReadingRoom() {
  return (
    <section className="edition-library wrap">
      <div className="edition-section-heading">
        <div>
          <p className="eyebrow">05 / THE READING ROOM</p>
          <h2>
            A little knowledge.
            <br />
            <em>A lot more clarity.</em>
          </h2>
        </div>
        <Link className="text-link" href="/knowledge">
          Enter the knowledge hub <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="reading-room">
        <Link className="reading-feature" href="/france/universities">
          <span className="eyebrow">THE FRANCE COLLECTION</span>
          <span className="reading-flower" aria-hidden="true">
            ✳
          </span>
          <h3>
            Find a place
            <br />
            for your
            <br />
            <em>curiosity.</em>
          </h3>
          <span>
            UNIVERSITIES & PROGRAMMES <ArrowUpRight size={21} />
          </span>
        </Link>
        <div className="reading-stories">
          {articles.map((a, i) => (
            <Link key={a.slug} href={`/insights/${a.slug}`}>
              <span className="eyebrow">
                0{i + 1} / {a.category}
              </span>
              <h3>{a.title}</h3>
              <span>
                READ THE GUIDE <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
          <Link className="reading-source" href="/campus-france-guide">
            Campus France: understand your application path{" "}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
