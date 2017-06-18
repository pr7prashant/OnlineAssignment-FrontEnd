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

    constructor() { }
}
