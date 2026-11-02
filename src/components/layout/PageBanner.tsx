import React from 'react';
import { Toran } from './Ornaments';

/** Dark temple header shared by the inner pages. */
export const PageBanner: React.FC<{ hindi: string; title: string }> = ({ hindi, title }) => (
  <section className="jaali relative border-b-2 border-brass-500/40 bg-sanctum text-center">
    <Toran scale={0.75} />
    <div className="px-4 pb-10 pt-3">
      <p lang="hi" className="brass-text pb-1 pt-2 font-deva text-4xl leading-snug sm:text-5xl sm:leading-snug">{hindi}</p>
      <h1 className="font-title text-xl text-ivory-100">{title}</h1>
    </div>
  </section>
);

export default PageBanner;
