import { Exchange } from '@/api'
import { ServiceOperation } from './service-operation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ServiceAccordionProps {
    name: string
    operations: Exchange[]
}

export function ServiceAccordion(props: ServiceAccordionProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{props.name}</AccordionTrigger>
                <AccordionContent>
                    <Tabs>
                        <TabsList>
                            {props.operations.map((operation, index) => (
                                <TabsTrigger
                                    key={index}
                                    value={index.toString()}
                                >
                                    {operation.type === 'reqRespPair'
                                        ? operation.request.name
                                        : operation.eventMessage.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {props.operations.map((operation, index) => (
                            <TabsContent key={index} value={index.toString()}>
                                <ServiceOperation operation={operation} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
