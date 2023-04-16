import type {Component} from 'solid-js'
import FileUpload from '../components/FileUpload'
import {ParsedLog} from '../fileParser'

const Home: Component = () => {
    function onParsed(parsed: ParsedLog) {
        console.log(parsed)
    }

    return (
        <div class="hero mt-20 bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-2xl">
                    <h1 class="text-5xl font-bold">Valorant XMPP Log Viewer</h1>
                    <p class="py-6">
                        This is a simple tool to view XMPP logs from Valorant.
                        Use <a class="link" href="https://github.com/techchrism/valorant-xmpp-logger">Valorant XMPP Logger</a> to get XMPP logs.
                    </p>

                    <FileUpload onParse={onParsed}/>
                </div>
            </div>
        </div>
    )
}

export default Home
