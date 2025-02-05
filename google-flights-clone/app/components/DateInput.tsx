import React, { useState, useRef, useEffect } from 'react'
import { CCol } from '@coreui/react'
import { CDateRangePicker, CDatePicker } from '@coreui/react-pro'

export const DateInput = ({ tripType }: { tripType: string }) => {

    return (
        tripType !== "one_way" ? (
            <CCol className="w-full h-full">
                <CDateRangePicker
                    size='lg'
                    confirmButton="Done"
                    placeholder={['Departure', 'Return']}
                    className='w-full h-full custom-date-picker'
                    cancelButton={false}
                    todayButton={false}
                    cleaner={false}
                    calendars={1}
                    footer
                    locale="en-US"
                    indicator={false}
                    onStartDateChange={(date) => {
                        console.log('New start date:', date);
                    }}
                    onEndDateChange={(date) => {
                        console.log('New end date:', date);
                    }}
                    portal={false}
                />
            </CCol>
        ) : (
            <CCol className="w-full h-full">
                <CDatePicker
                    size='lg'
                    confirmButton="Done"
                    placeholder={['Departure', 'Return']}
                    className='w-full h-full custom-date-picker'
                    cancelButton={false}
                    todayButton={false}
                    cleaner={false}
                    footer
                    locale="en-US"
                    indicator={false}
                    portal={false} />
            </CCol>
        )
    )
}
export default DateInput;