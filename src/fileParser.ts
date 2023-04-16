type OpenValorantEventType = 'open-valorant'
type OpenCloseEventTypes = 'close-valorant' | 'open-riot' | 'close-riot'
type DataEventTypes = 'outgoing' | 'incoming'

interface HeaderData {
    type: 'valorant-xmpp-logger'
    version: string
}

interface EventBase {
    time: number
}

interface OpenCloseLogEvent extends EventBase {
    type: OpenCloseEventTypes
    socketID: number
}

interface OpenValorantLogEvent extends EventBase {
    type: OpenValorantEventType
    socketID: number
    host: string
    port: number
}

interface DataLogEvent extends EventBase {
    type: DataEventTypes
    data: string
}

export type LogEvent = OpenValorantLogEvent | OpenCloseLogEvent | DataLogEvent

export interface ParsedLog {
    version: string
    events: LogEvent[]
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function parseFile(file: File): Promise<ParsedLog> {
    const lines = (await file.text()).split('\n')
    let header: HeaderData
    try {
        header = JSON.parse(lines[0])
        if(!header.version || header.type !== 'valorant-xmpp-logger') {
            throw new Error('missing version or type')
        }
    } catch(e) {
        throw new Error(`Invalid log file (bad header - ${e})`)
    }

    const parsed: ParsedLog = {
        version: header.version,
        events: []
    }

    for(let i = 1; i < lines.length; i++) {
        const line = lines[i]
        if(line.length === 0 || line.startsWith('#')) continue

        parsed.events.push(JSON.parse(line))
    }

    return parsed
}