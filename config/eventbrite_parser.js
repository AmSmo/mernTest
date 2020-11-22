module.exports = {getUsers : (eventData) =>{
    let attendees = eventData.attendees
    let desiredInfo = {}
    for (attendee of attendees){      
        
        desiredInfo[attendee["barcodes"][0]["barcode"]] = attendee["profile"]
    }
    return desiredInfo
    // return eventData /* In Case we need to find more data we can swap this line to find it*/
    }
    ,
    
    getEventList: (eventsData) =>{
        let {events} = eventsData
        let dateIdList = {}
        for (show of events){
            // May want to add filter layer in case outside events exist
            let date = show["start"]["local"]
            dateIdList[date] = show["id"]
        }
        return dateIdList
        // return eventsData /* if we need to sort better, quick change */
    }
}