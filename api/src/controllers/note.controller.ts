import { Body, Get, Post, Route } from "tsoa";
import AWS from 'aws-sdk'
import variables from "../variables";
import { v1 } from 'uuid'

interface NoteResponse {
    message: string;
}

interface CreateNoteRequest {
    text: string
}
const dynamoDb = new AWS.DynamoDB.DocumentClient();

@Route("note")
export class NoteController {

    @Post("/")
    public async createNote(@Body() note: CreateNoteRequest): Promise<number> {
        const response = await dynamoDb.put({
            TableName: variables.tables.notes,
            Item: {
                noteId: v1(),
                text: note.text
            }
        }).promise()
        
        return 2;
    }

    @Get("/")
    public async getNote(): Promise<NoteResponse> {
        return {
            message: "pong",
        };
    }
}