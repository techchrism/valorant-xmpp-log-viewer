import {Component, createMemo, createSignal, For} from 'solid-js'
import {ParsedLog} from '../fileParser'
import {FiFilter} from 'solid-icons/fi'
import LogDisplayListElement from '../components/LogDisplayListElement'

export type LogDisplayProps = {
    parsedLog: ParsedLog
}

const LogDisplay: Component<LogDisplayProps> = (props) => {
    const [activeIndex, setActiveIndex] = createSignal(0)
    const activeItem = createMemo(() => props.parsedLog.xml[activeIndex()])

    return (
        <>
            <div class="min-h-screen md:grid md:grid-cols-main">
                <aside class="md:sticky top-0 left-0 md:h-screen overflow-y-auto bg-gray-50 dark:bg-gray-800" aria-label="Sidebar">
                    <div class="sticky top-0 z-10 bg-base-300 py-2">
                        <h1 class="text-xl font-semibold text-center mb-2">Log Display</h1>

                        <div class="mx-2 flex flex-row">
                            <input type="text" class="input mr-2 flex-grow" placeholder="Search..."/>
                            <button class="btn btn-square"><FiFilter title="Filter"/></button>
                        </div>
                    </div>
                    <ul class="menu bg-base-200 text-base-content">
                        <For each={props.parsedLog.xml}>
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
                    <code class="whitespace-pre-wrap break-all">
                        {JSON.stringify(activeItem().data, null, 4)}
                    </code>
                </main>
            </div>
        </>
    )
}

export default LogDisplay