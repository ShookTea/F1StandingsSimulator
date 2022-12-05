const fileRegex: RegExp = /sim\/f1\/driver\.data$/;

export default {
    name: 'data-build',
    transform(src: string, id: string): string {
        if (!fileRegex.test(id)) {
            return;
        }
        // const data: DataInput = JSON.parse(src);
        // const converted: Season = convert(data)

        return 'export default ' + JSON.stringify({foo: 'bar'});
    }
};