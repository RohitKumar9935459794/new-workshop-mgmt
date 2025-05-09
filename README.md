# All needed APIs
// new workshop creation
 Done - to insert new workshop detail only workshop details       -------------/api/workshops/new----------
 DOne - to upload excel for particular workshop -------------------------------/api/workshops/:workshopId/upload-----------

// fetching filters.. dynamic filtering..(same filters for both workshops and participants)
 Done - to fetch distinct entry for options for filters------------------------/api/workshops/filters----------

// total for session wise
Done - to fetch total workshops and total participants for session wise(year) -------------/api/workshops/stats/:year-----!!-----


//view workshop details
Done -  To show all workshops with total counts of workshops and total participants (with/without filter only one api)
  also view data is present or not 
 - for that views total participant count for each workshop. -----------------------------/api/workshops/reports----------
// view participant details
Done - to show participants for particular workshop. view participant option.-------------/api/participants/:workshopId-----------
Done - to show all participants from all workshops with total counts of workshops and total participants (with/without filter     only one api) by default filter is date from jan current year to till now------------------/api/participants/reports------------

//download reports
Done -  to download filtered workshop reports as excel/pdf-----------------------------------/api/workshops/reports/download------
 (one api format as query parameter)          
Done - to download filtered participant reports as excel/pdf ---------------------------/api/participants/reports/download-------


