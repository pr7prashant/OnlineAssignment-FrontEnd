export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    asnDetailKey: string;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}
