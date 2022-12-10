declare global {

    interface IQueryLocalFontsOptions {
        postscriptNames?: string[];
    }

    interface ILocalFont {
        family: string;
        fullName: string;
        postscriptName: string;
        style: string;
    }

    function queryLocalFonts(options?: IQueryLocalFontsOptions): Promise<ILocalFont[]>;

}

export {}