import {Component, createMemo, Show} from 'solid-js'
import {ParsedLog} from '../fileParser'
import {FiArrowDownLeft, FiArrowUpRight} from 'solid-icons/fi'

export type LogDisplayListElementProps = {
    item: ParsedLog['xml'][0]
}

const LogDisplayListElement: Component<LogDisplayListElementProps> = (props) => {
    const first = createMemo(() => props.item.buffer[0])
    const time = createMemo(() => new Date(first().time))
    const length = createMemo(() => props.item.buffer.reduce((prev, curr) => prev + curr.data.length, 0))

    const title = createMemo(() => {
        if(props.item.data.hasOwnProperty('presence') && Object.keys(props.item.data).length === 1) {
            return 'Presence Update'
        }
        return 'Item'
    })

    const subtitle = createMemo(() => {
        if(props.item.data.hasOwnProperty('iq') && props.item.data.iq.hasOwnProperty('id')) {
            return props.item.data.iq.id
        } else if(props.item.data.hasOwnProperty('presence') && Object.keys(props.item.data).length === 1) {
            try {
                const presenceData = JSON.parse(atob(props.item.data.presence.games.valorant.p))
            } catch(ignored) {}
        }
    })

    return (
        <>
            <div class="flex flex-row items-center space-x-3 w-full">
                <div>
                    <Show when={first().type === 'incoming'} fallback={<FiArrowUpRight color="#3B82F6"/>}>
                        <FiArrowDownLeft color="#F97316"/>
                    </Show>
                </div>
                <div class="flex-grow">
                    {title()}
                    <Show when={subtitle() !== undefined}>
                        <p>{subtitle()}</p>
                    </Show>

                </div>
                <div class="text-center whitespace-nowrap">
                    {`${time().getHours()}:${time().getMinutes()}`}
                    <p class="font-light">{`${Math.round(length() / 100) / 10} Kb`}</p>
                </div>
            </div>

        </>
    )
}

export default LogDisplayListElement