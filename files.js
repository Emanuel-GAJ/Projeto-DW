import { promisify } from 'util';
import { exec } from 'child_process';
import { statSync } from 'fs';
import { resolve, extname } from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

function humanFileSize(bytes, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
}

export async function listFiles(dir = 'files') {
    let command;
    if (os.platform() === 'win32') {
        command = `dir /B ${dir}`;
    } else {
        command = `ls ${dir}`;
    }

    const { stdout } = await execAsync(command);

    const fileNames = stdout.split(os.EOL).filter((file) => file !== '');

    const files = [];

    for (const file of fileNames) {
        const filePath = resolve(dir, file);

        const fileStat = statSync(filePath);

        const name = `${dir}/${file}`;

        const extension = extname(file).replace('.', '');

        const { birthtime: date, size, ino: id } = fileStat;

        const user = os.platform() === 'win32' ? process.env.USERNAME : fileStat.uid;

        const type = fileStat.isDirectory() ? 'directory' : 'file';

        files.push({
            id,
            name,
            extension,
            user,
            date,
            size: humanFileSize(size),
            type
        })
    }

    return files;
}
