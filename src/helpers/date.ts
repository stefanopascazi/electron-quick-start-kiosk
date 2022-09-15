export const releaseDate = (data: any) => {
    if( typeof data === 'undefined' || data === null ){
        return undefined
    }
    var currentDate = new Date(data);

    var day = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var correctDay: string = day.toString();
    var correctMonth: string = (month+1).toString()
    if( day < 9)
    {
        correctDay = "0" +correctDay;
    }
    if( month < 9)
    {
        correctMonth = "0" +correctMonth;
    }
    var year = currentDate.getFullYear();

    var dateString = year + "-" + correctMonth + "-" + correctDay;
    return dateString;
}