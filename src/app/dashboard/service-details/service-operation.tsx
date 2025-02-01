import { Exchange, RequestResponsePair, UnidirectionalEvent } from '@/api'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface ServiceOperationProps {
    operation: Exchange
    name: string
}

interface RestExchange {
    operation: RequestResponsePair
    name: string
}

interface EventExchange {
    operation: UnidirectionalEvent
    name: string
}

export function ServiceOperation(props: ServiceOperationProps) {
    const isRest = props.operation.type === 'reqRespPair'
    return (
        <div className="grid grid-cols-2">
            {isRest ? (
                <RestRequestContent
                    operation={props.operation as RequestResponsePair}
                    name={props.name}
                />
            ) : (
                <EventRequestContent
                    operation={props.operation as UnidirectionalEvent}
                    name={props.name}
                />
            )}
            {isRest ? (
                <RestResponseContent
                    operation={props.operation as RequestResponsePair}
                    name={props.name}
                />
            ) : (
                <EventResponseContent
                    operation={props.operation as UnidirectionalEvent}
                    name={props.name}
                />
            )}
        </div>
    )
}

function RestRequestContent(props: RestExchange) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Request</CardTitle>
                <CardDescription>
                    Operation : {props.name.split(' ')[0]}
                </CardDescription>
            </CardHeader>
            <CardContent>{}</CardContent>
        </Card>
    )
}

function EventRequestContent(props: EventExchange) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Request</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}

function RestResponseContent(props: RestExchange) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Response</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}

function EventResponseContent(props: EventExchange) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Response</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}
