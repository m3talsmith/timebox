function FeaturesController ( $scope, $timeout ) {
  $scope.features = [];
  $scope.creatingFeature = false;

  $scope.createFeature = function () {
    feature = {
      title: $scope.title,
      hoursEstimated: $scope.hoursEstimated,
    };

    createTimeboxesForFeature ( feature );
    $scope.features.push ( feature );

    $scope.title = '';
    $scope.hoursEstimated = '';
    $scope.creatingFeature = false;
  };

  $scope.newFeature = function () {
    $scope.creatingFeature = true;
  };

  function createTimeboxesForFeature ( feature ) {
    if ( !feature.hoursEstimated ) feature.hoursEstimated == 0;

    feature.timerRunning = false;
    feature.timeboxes = [];

    feature.startTimer = function () {
      feature.timerRunning = true;
      feature.calculateRunningTime ();
    };

    feature.stopTimer = function () {
      feature.timerRunning = false;
    };

    feature.markNextTimebox = function () {
      console.log ( 'yeah' );
      if ( !feature.timerRunning ) return;

      openbox = null;
      
      for ( var index = 0; index < feature.timeboxes.length; index ++ ) {
        var timebox = feature.timeboxes [ index ];

        if ( openbox ) break;
        if ( timebox.status == 'open' ) openbox = timebox;
      }

      if ( !openbox ) {
        openbox = {
          status: 'redboxed',
          id: ( feature.timeboxes.length + 1 ),
        };
        feature.timeboxes.push ( openbox );
      } else {
        openbox.status = 'closed';
      }
    };

    feature.resetRunningTime = function () {
      feature.runningTime = '15';
      feature.calculateRunningTime ();
    };

    feature.calculateRunningTime = function () {
      if ( !feature.timerRunning ) return;
      if ( !feature.runningTime ) {
        feature.resetRunningTime ();
        return;
      }

      feature.runningTime = feature.runningTime -1;

      if ( feature.runningTime <= 0 ) {
        feature.markNextTimebox ();
        feature.resetRunningTime ();
      } else {
        $timeout ( feature.calculateRunningTime, 1000 );
      }
    };

    boxCount = ( feature.hoursEstimated / .25 );

    for ( index = 0; index < boxCount; index ++ ) {
      newbox = { status: 'open', id: ( index + 1 ) };
      feature.timeboxes.push ( newbox );
    }
  }
}
