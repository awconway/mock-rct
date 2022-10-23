import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Radio({ name, label, options }) {
    const [mem, setMem] = useState(null)

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">{label}</h2>
            </div>
            <RadioGroup 
                name={name}
                value={mem} onChange={setMem} className="mt-2">
                <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-10">
                    {options.map((option) => (
                        <RadioGroup.Option
                            key={option}
                            name={name}
                            value={option}
                            className={({ active, checked }) =>
                                classNames(
                                    active ? 'ring-2 ring-offset-2 ring-blue-500' : '',
                                    checked
                                        ? 'bg-blue-600 border-transparent text-white hover:bg-blue-700'
                                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                    'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                )
                            }
                        >
                            <RadioGroup.Label as="span">{option}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
