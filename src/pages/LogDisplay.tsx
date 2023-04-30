import {Component, ComponentProps, createEffect, createMemo, createSignal, For, onMount, Show} from 'solid-js'
import {ParsedLog} from '../fileParser'
import {FiFilter} from 'solid-icons/fi'
import LogDisplayListElement from '../components/LogDisplayListElement'
import '@alenaksu/json-viewer'

// Types for the json-viewer component, modified from https://stackoverflow.com/a/72239265
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            "json-viewer": ComponentProps<"div"> & { data: any }
        }
    }
}

export type LogDisplayProps = {
    parsedLog: ParsedLog
}

const LogDisplay: Component<LogDisplayProps> = (props) => {
    const [activeIndex, setActiveIndex] = createSignal(0)
    const [search, setSearch] = createSignal('')

    const items = createMemo(() => {
        return props.parsedLog.xml
            .filter(item => item.buffer.some(buffer => buffer.data.includes(search())))
    })
    const activeItem = createMemo(() => items()[activeIndex()])

    let jsonViewer
    createEffect(() => {
        if(activeItem()) {
            jsonViewer.expandAll()
        }
    })

    return (
        <>
            <div class="min-h-screen md:grid md:grid-cols-main">
                <aside class="md:sticky top-0 left-0 md:h-screen overflow-y-auto" aria-label="Sidebar">
                    <div class="sticky top-0 z-10 bg-base-300 py-2">
                        <h1 class="text-xl font-semibold text-center mb-2">Log Display</h1>

                        <div class="mx-2 flex flex-row">
                            <input type="text" class="input mr-2 flex-grow" placeholder="Search..." oninput={(e) => {setSearch((e.target as HTMLInputElement).value)}}/>
                            <button class="btn btn-square"><FiFilter title="Filter"/></button>
                        </div>
                    </div>
                    <ul class="menu bg-base-200 text-base-content">
                        <For each={items()}>
                            {(item, index) => (<>
                                <li>
                                    <a class="w-full py-1 px-2 border-y border-base-100" classList={{active: index() === activeIndex()}} onClick={() => setActiveIndex(index())}>
                                        <LogDisplayListElement item={item}/>
                                    </a>
                                </li>
                            </>)}
                        </For>
                    </ul>
                </aside>
                <main class="p-5">
                    <Show when={activeItem()}>
                        <code class="whitespace-pre-wrap break-all">
                            <json-viewer data={activeItem().data} ref={jsonViewer}></json-viewer>
                        </code>
                    </Show>
                </main>
            </div>
        </>
    )
}

export default LogDisplay