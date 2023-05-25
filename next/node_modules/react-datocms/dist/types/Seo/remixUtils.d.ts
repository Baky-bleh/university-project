import { TitleMetaLinkTag, SeoOrFaviconTag } from './types';
interface RemixHtmlMetaDescriptor {
    [name: string]: string | string[];
}
export declare function toRemixMeta(metaTags: null | TitleMetaLinkTag[] | SeoOrFaviconTag[]): RemixHtmlMetaDescriptor;
export {};
