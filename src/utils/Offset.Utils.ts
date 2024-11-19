

class ManageOffsetWindow {
    static getOffset(offset: string) {
        const offsetArr = offset.split(' ');
        const [x, y] = offsetArr;
        return { x: parseInt(x), y: parseInt(y) };
    }
}

export const Offset = new ManageOffsetWindow();