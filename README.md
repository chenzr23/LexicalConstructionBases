# Basis 91 — Definition Dependency Hypergraph

This static research website contains 110,425 semantic nodes and 154,207 dependency clauses. Its inventory uses the 91-basis convention, including AND, OR and NOT as structural operators. The original NOT sense retains its definition, argumentation, word sense disambiguation and dependency relations.

Visitors can search by lemma, sense identifier or definition; inspect complete definition alternatives and their fragments; read argumentation and token-level disambiguation; and explore both the concepts a sense depends on and the senses that depend on it. Missing argumentation is identified explicitly.

## Publishing

Publish only the files in this directory. No build or application server is required. Use a current browser with JavaScript and native gzip decompression support.

For Anonymous GitHub:

1. Put these files at the root of a dedicated GitHub publishing branch. Keep `.nojekyll` with them.
2. Enable GitHub Pages for that branch and its root directory.
3. Import the repository into Anonymous GitHub, select the same branch and enable its GitHub Pages option.
4. Choose an anonymous identifier that contains no author or institution information. Review redaction rules carefully: changing program identifiers or encoded data can break the application.
5. Test the anonymous website link, including search, direct sense links, definition details, both dependency directions and JSON viewing. Choose an expiration policy that does not redirect readers to an identifying source repository.

All application resource URLs are relative, so the website can run beneath a path such as `/w/example/`. Share the website URL with a trailing slash. Sense links use URL fragments.

The data files are loaded through classic script callbacks. Their payloads preserve the gzip-compressed dataset bytes. Search runs in asynchronous batches on the main thread. The application does not require persistent browser storage, a worker or cross-origin data requests. Each file is smaller than 8 MiB.

The JSON button opens a complete record in an on-page text viewer. A user can select and copy the text if the host blocks automatic clipboard access. The application does not attempt to bypass restrictions on downloads. Language selection applies to the current page session.

## Data and attribution

Definitions and compilation records retain public source labels and source links where available. Source-specific licence and attribution requirements continue to apply; this publishing format does not grant additional rights in third-party material.

- [Open English WordNet](https://en-word.net/)
- [Wiktionary](https://en.wiktionary.org/)
- [Kaikki English dictionary data](https://kaikki.org/dictionary/English/)

`data/manifest.json` records the graph fingerprint, counts and public data policies. The encoded index and record scripts contain the same graph and linguistic content as the corresponding compressed dataset. Only transport metadata and presentation behavior differ in this static publishing edition.

## Privacy

The publishing directory contains no author names, account identifiers, private source paths, build logs or repository administration files. Binary and encoded payloads must be reviewed before publication; hosting-service text replacement does not inspect the contents of compressed data. Anonymous presentation does not erase previously published copies or prevent a hosting provider from knowing its account holders.
