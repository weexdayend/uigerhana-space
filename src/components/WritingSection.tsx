import { FEATURED_WRITING, PUBLICATION_PROFILES } from "@/data/writing";

export function WritingSection() {
  return (
    <section
      id="writing"
      data-band="light"
      className="atlas-writing"
      aria-labelledby="writing-title"
    >
      <div className="atlas-writing__container">
        <header className="atlas-writing__header">
          <div className="atlas-writing__heading">
            <p className="atlas-writing__eyebrow">
              <span>06 /</span>
              Writing &amp; notes
            </p>
            <h2 id="writing-title">Ideas behind the systems.</h2>
          </div>

          <p className="atlas-writing__introduction">
            Writing about engineering judgment, enterprise workflows, data
            architecture, and the context that makes intelligent systems useful.
          </p>
        </header>

        <div className="atlas-writing__articles">
          {FEATURED_WRITING.map((article, index) => (
            <article className="atlas-writing__article" key={article.id}>
              <div className="atlas-writing__article-topline">
                <span className="atlas-writing__category">{article.category}</span>
                <span className="atlas-writing__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="atlas-writing__article-copy">
                <p className="atlas-writing__publication">
                  {article.publication}
                  <span aria-hidden="true"> · </span>
                  {article.readingTime}
                </p>

                <h3 className="atlas-writing__title">
                  <a
                    className="atlas-writing__article-link"
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      "Read " +
                      article.title +
                      " on " +
                      article.publication +
                      " (opens in a new tab)"
                    }
                  >
                    {article.title}
                    <span aria-hidden="true" className="atlas-writing__external">
                      ↗
                    </span>
                  </a>
                </h3>

                <p className="atlas-writing__summary">{article.summary}</p>
              </div>

              <footer className="atlas-writing__article-footer">
                <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
                <span>{article.readingTime}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="atlas-writing__directory">
          <p>More writing and public notes</p>
          <nav aria-label="Publication profiles">
            {PUBLICATION_PROFILES.map((profile) => (
              <a
                key={profile.id}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-writing__profile-link"
              >
                <span>{profile.platform}</span>
                <span className="atlas-writing__profile-handle">{profile.handle}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
