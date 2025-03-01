String.prototype.toCapitalize = function () {
    return this.replace(/^\w/, (c) => c.toUpperCase());
}