const createVarint = (value: number): Buffer => {
    if (value < 0xfd) {
        const buffer = Buffer.alloc(1);
        buffer[0] = value;
        return buffer;
    }
    if (value <= 0xffff) {
        const buffer = Buffer.alloc(3);
        buffer[0] = 0xfd;
        buffer[1] = value & 0xff;
        buffer[2] = (value >> 8) & 0xff;
        return buffer;
    }
    const buffer = Buffer.alloc(5);
    buffer[0] = 0xfe;
    buffer[1] = value & 0xff;
    buffer[2] = (value >> 8) & 0xff;
    buffer[3] = (value >> 16) & 0xff;
    buffer[4] = (value >> 24) & 0xff;
    return buffer;
};
export const serializeTransactionOutputs = (outputs: any): Buffer => {
    let outputBuffer = Buffer.alloc(0);
    if (typeof outputs !== 'undefined') {
        outputBuffer = Buffer.concat([outputBuffer, createVarint(outputs.length)]);
        outputs.forEach((output: any) => {
            outputBuffer = Buffer.concat([
                outputBuffer,
                output.amount,
                createVarint(output.script.length),
                output.script,
            ]);
        });
    }
    return outputBuffer;
};
