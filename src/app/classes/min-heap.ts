export class MinHeap<T extends { id?: string, weight: number }> {
    public harr: T[] = [];

    constructor() {
    }

    lessThan(a: T, b: T): boolean { return a.weight < b.weight }

    get(id: string): T | undefined {
        return this.harr.find(t => t.id == id)
    }

    contains(id: string): boolean {
        return this.harr.find(t => t.id == id) !== undefined ? true : false;
    }

    size() {
        return this.harr.length;
    }

    push(v: T) {
        this.harr.push(v);
        let i = this.harr.length - 1;
        while (i > 0 && this.lessThan(this.harr[i], this.harr[this.parent(i)])) {
            swap(this.harr, i, this.parent(i));
            i = this.parent(i);
        }
    }

    popFront() {
        if (this.harr.length === 0) throw new Error('Overflow');

        const [head] = this.harr;
        this.harr[0] = this.harr[this.harr.length - 1];
        this.harr.length -= 1;

        this.heapify(0);

        return head;
    }

    popItem(id: string) {
        if (this.harr.length === 0) throw new Error('Overflow');

        let index = this.harr.findIndex(t => t.id === id);
        let obj = this.harr[index];
        this.harr[index] = this.harr[this.harr.length - 1];
        this.harr.length -= 1;
        this.heapify(index);
        return obj;
    }

    private heapify(i: number) {
        const l = this.left(i);
        const r = this.right(i);
        let smallest = i;
        if (l < this.harr.length && this.lessThan(this.harr[l], this.harr[i])) {
            smallest = l;
        }
        if (r < this.harr.length && this.lessThan(this.harr[r], this.harr[smallest])) {
            smallest = r;
        }
        if (smallest !== i) {
            swap(this.harr, smallest, i);
            this.heapify(smallest);
        }
    }

    private parent(i: number) {
        return Math.floor((i - 1) / 2);
    }

    private left(i: number) {
        return 2 * i + 1;
    }

    private right(i: number) {
        return 2 * i + 2;
    }
}

// https://leetcode.com/problems/task-scheduler/discuss/1503713/typescript-priority-queue
// By LC-user "doronin"

function swap<T>(list: T[], i: number, j: number): T[] {
    if (i !== j) {
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}
