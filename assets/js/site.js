
function getPercent(a, b) {
  return Math.floor((a / b) * 100) + '%';
}

function runDashboard() {
  $.getJSON("http://bluebutton.healthit.gov/data/organizations.json", function(data) {
    var totalOrgs = data.length;
    
    $('#num-of-orgs').html(totalOrgs);
    
    var viewCount = 0, downloadCount = 0, transmitCount = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].view) viewCount++;
      if (data[i].download) downloadCount++;
      if (data[i].transmit) transmitCount++;
    }
    
    var viewPercent = getPercent(viewCount, totalOrgs);
    var downloadPercent = getPercent(downloadCount, totalOrgs);
    var transmitPercent = getPercent(transmitCount, totalOrgs);
    
    $('#num-of-view').html(viewCount);
    $('#num-of-view-percent').html(viewPercent);
    $('#num-of-download').html(downloadCount);
    $('#num-of-download-percent').html(downloadPercent);
    $('#num-of-transmit').html(transmitCount);
    $('#num-of-transmit-percent').html(transmitPercent);
    
    var val = '';
    for (var i = 0; i < data.length; i++) {
      // view
      val = data[i].view ? 'available' : 'unavailable';
      $('#view-status-boxes').append("<a href='/profile/#"+ data[i].id +"'><div class='status "+ val +"' data-tooltip='"+ data[i].name +"' onclick=''></div></a>");
      
      // download
      val = data[i].download ? 'available' : 'unavailable';
      $('#download-status-boxes').append("<a href='/profile/#"+ data[i].id +"'><div class='status "+ val +"' data-tooltip='"+ data[i].name +"' onclick=''></div></a>");
    }
    
  });
}


function runProfile() {
  
  $.getJSON("http://bluebutton.healthit.gov/data/organizations.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == window.location.hash.slice(1)) {
        console.log(data[i]);
        $('.page-header h1, .org-name').html(data[i].name);
        $('#org-type').html(data[i].category);
        
        if (data[i].view) {
          $('#view-status').html("✅ Allows patients to <b>view</b> personal health data online");
        } else {
          $('#view-status').html("❌ Does not allow patients to <b>view</b> personal health data online");
        }
        
        if (data[i].download) {
          $('#download-status').html("✅ Allows patients to <b>download</b> personal health data");
        } else {
          $('#download-status').html("❌ Does not allow patients to <b>download</b> personal health data");
        }
        
        $('#portal-url').attr('href', data[i].url);
      }
    }
  });
}
