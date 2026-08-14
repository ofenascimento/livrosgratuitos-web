export interface EpubLocations {
    length: () => number;
    generate: (charsPerLocation: number) => Promise<string[]>;
    locationFromCfi: (cfi: string) => number | null;
    percentageFromCfi: (cfi: string) => number;
}

export interface EpubSpineItem {
    href: string;
    index: number;
}

export interface EpubSpine {
    each: (callback: (item: EpubSpineItem) => void | false) => void;
}

export type EpubRendition = Rendition;

export interface EpubNavItem {
  href: string;
  label: string;
  subitems?: EpubNavItem[];
}

export interface EpubNavigation {
    toc: EpubNavItem[];
}

export interface EpubBook {
    ready: Promise<void>;
    loaded: {
        navigation: Promise<EpubNavigation>;
    };
    locations: EpubLocations;
    spine: EpubSpine;
}

export interface EpubRelocatedLocation {
    start: {
        cfi: string;
    };
}

export interface EpubViewPane {
    render?: () => void;
}

export interface EpubView {
    pane?: EpubViewPane;
}

export interface EpubThemeRules {
    [selector: string]: Record<string, string>;
}

export interface EpubThemes {
    default: (rules: EpubThemeRules) => void;
    fontSize: (size: string) => void;
}

export interface EpubRendition {
    book: EpubBook;
    themes: EpubThemes;
    display: (target?: string | number) => Promise<void>;
    views: () => EpubView[];
    on: (event: "relocated", callback: (location: EpubRelocatedLocation) => void) => void;
}