export class Assignment {
    $key: string;
    course: string;
    batch: string;
    subject: string;
    uid: string;
    AsnName: string;
    AsnDesc: string;
    dueDate: Date;
    fileKey: any[] = [];
    createdAt: Date = new Date();

    constructor() {
        this.course = "";
        this.batch = "";
        this.subject = "";
        this.uid = "";
        this.AsnName = "";
        this.AsnDesc = "";
        this.dueDate = new Date();
        this.fileKey = [];
        this.createdAt = new Date();
    }
}
