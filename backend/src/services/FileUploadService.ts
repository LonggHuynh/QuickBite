import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { on } from 'events';
import { v4 as uuidv4 } from 'uuid';

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME as string;
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME as string;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);


export const uploadFile = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
    const blobName = `${uuidv4()}-${fileName}`;
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);


    await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: mimeType },
    });
    return `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${AZURE_CONTAINER_NAME}/${blobName}`;

}

