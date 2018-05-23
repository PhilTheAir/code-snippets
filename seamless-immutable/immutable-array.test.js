const Immutable = require('seamless-immutable');

describe('overview', () => {

    let a = Immutable(['totally', 'immutable', { hammer: 'Can not Touch This' }]);
    it('is immutable', () => {
        a[1] = 'I am going to mutate you!'
        expect(a[1]).toBe('immutable');

        a[2].hammer = 'mutate this nested object...';
        expect(a[2].hammer).toBe('Can not Touch This');

        expect(a[2]).toEqual({ hammer: 'Can not Touch This' });

        let s = JSON.stringify(a);
        expect(s).toBe('["totally","immutable",{"hammer":"Can not Touch This"}]');

    });

});

describe('flatMap', () => {

    let i = Immutable(["here", "we", "go"]);
    let j = i.flatMap((str) => {
        return [str, str, str];
    });
    let k = i.map((str) => {
        return [str, str, str];
    });
    it('is immutable', () => {
        expect(i).toEqual(Immutable(["here", "we", "go"]));
        expect(j).toEqual(Immutable(['here', 'here', 'here', 'we', 'we', 'we', 'go', 'go', 'go']));
        expect(k).toEqual([['here', 'here', 'here'], ['we', 'we', 'we'], ['go', 'go', 'go']]);
    });

    let n = Immutable(["drop the numbers!", 3, 2, 1, 0, null, undefined]);
    let m = n.flatMap((value) => {
        if (typeof value === "number") {
            return [];
        }
        else {
            return value;
        }
    });
    let p = n.map((value) => {
        if (typeof value === "number") {
            return [];
        }
        else {
            return value;
        }
    });
    it('is immutable', () => {
        expect(n).toEqual(Immutable(['drop the numbers!', 3, 2, 1, 0, null, undefined]));
        expect(m).toEqual(Immutable(['drop the numbers!', null, undefined]));
        expect(p).toEqual(['drop the numbers!', [], [], [], [], null, undefined]);
    });

});

describe('asObject', () => {

    let i = Immutable(["hey", "you"]);
    let j = i.asObject((str) => {
        return [str, str.toUpperCase()];
    });
    it('is immutable', () => {
        expect(i).toEqual(Immutable(["hey", "you"]));
        expect(j).toEqual(Immutable({ hey: "HEY", you: "YOU" }));
    });

});

describe('asMutable', () => {

    let i = Immutable(['hello', 'world']);
    let j = i.asMutable();
    j.push('!!!');

    it('is immutable', () => {
        expect(i).toEqual(Immutable(['hello', 'world']));
        expect(j).toEqual(['hello', 'world', '!!!']);
    });

});

describe('Pure javascript immutable Array', () => {

    let i = Immutable(['hello', 'world']);
    let j = Immutable(['!!!']);

    // Push
    function immutablePush(arr, newEntry) {
        return [...arr, newEntry];
    }

    // Pop
    function immutablePop(arr) {
        return arr.slice(0, -1);
    }

    // Shift
    function immutableShift(arr) {
        return arr.slice(1);
    }

    // Unshift
    function immutableUnshift(arr, newEntry) {
        return [newEntry, ...arr];
    }
    
    // Sort
    function immutableSort(arr, compareFunction) {
        return [...arr].sort(compareFunction);
    }
    
    // Reverse
    function immutableReverse(arr) {
        return [...arr].reverse();
    }
    
    // Splice
    function immutableSplice(arr, start, deleteCount, ...items) {
        return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
    }
    
    // Delete
    function immutableDelete(arr, index) {
        return arr.slice(0, index).concat(arr.slice(index + 1));
    }

    // Copy
    function immutableCopy(arr) {
        return [...arr];
    }

    it('is immutable', () => {
        
    });

});