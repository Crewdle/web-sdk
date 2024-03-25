import { IDatabaseLayout, IDatabaseTableLayout, ILayoutBuilder, ITableBuilder } from '@crewdle/web-sdk-types';
/**
 * A layout builder for the {@link IKeyValueDatabase}.
 * @category Key-Value Database
 */
export declare class LayoutBuilder implements ILayoutBuilder {
    private layout;
    private constructor();
    /**
     * Validates a layout.
     * @param layout The layout to validate.
     * @returns Whether the layout is valid, and a descriptive message.
     */
    static validateLayout(layout: IDatabaseLayout): [boolean, string];
    /**
     * Creates a layout builder.
     * @param version The version of the layout.
     * @returns A layout builder.
     */
    static layout(version: number): LayoutBuilder;
    /**
     * Adds a table to the layout.
     * @param name The name of the table.
     * @returns A table builder.
     */
    table(name: string): TableBuilder;
    /**
     * Gets the layout.
     * @returns The layout: {@link IDatabaseLayout}.
     */
    getLayout(): IDatabaseLayout;
}
/**
 * A table builder for the {@link IKeyValueDatabase}.
 * @category Key-Value Database
 */
export declare class TableBuilder implements ITableBuilder {
    private tableLayout;
    /**
     * @ignore
     */
    constructor(tableLayout: IDatabaseTableLayout);
    /**
     * Adds an index to the table.
     * @param name The name of the index.
     * @returns The table builder.
     */
    index(name: string): TableBuilder;
}
