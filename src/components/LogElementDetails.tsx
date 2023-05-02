import {Component, createEffect} from 'solid-js'
import CopyButton from './CopyButton'
import {ParsedLog} from '../fileParser'

export type LogElementDetailsProps = {
    item: ParsedLog['xml'][0]
}

const LogElementDetails: Component<LogElementDetailsProps> = (props) => {
    let jsonViewer
    createEffect(() => {
        if(props.item) {
            jsonViewer.expandAll()
        }
    })

    const copyXML = async () => {
        try {
            await navigator.clipboard.writeText(props.item.buffer.map(b => b.data).join(''))
            return true
        } catch(ignored) {
            return false
        }
    }

    const copyJSON = async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(props.item.data, null, 4))
            return true
        } catch(ignored) {
            return false
        }
    }

    return (
        <>
            <div tabindex="0" class="collapse collapse-plus border bg-base-200 rounded-box">
                <input type="checkbox"/>
                <div class="collapse-title text-xl font-medium">
                    XML Data
                </div>
                <div class="collapse-content">
                    <div class="mb-2">
                        <CopyButton copyCallback={copyXML}>
                            Copy XML
                        </CopyButton>
                    </div>
                    <code class="break-all">
                        {props.item.buffer.map(b => b.data).join('')}
                    </code>
                </div>
            </div>

            <div tabindex="0" class="collapse collapse-plus border bg-base-200 rounded-box">
                <input type="checkbox" checked/>
                <div class="collapse-title text-xl font-medium">
                    Interactive JSON Representation
                </div>
                <div class="collapse-content break-all">
                    <div class="mb-2">
                        <CopyButton copyCallback={copyJSON}>
                            Copy JSON
                        </CopyButton>
                    </div>
                    <json-viewer data={props.item.data} ref={jsonViewer}></json-viewer>
                </div>
            </div>
        </>
    )
}

export default LogElementDetails