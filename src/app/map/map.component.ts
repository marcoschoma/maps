import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('gmap') gmapElement: any;
  private map: any;
  private drawingManager: google.maps.drawing.DrawingManager;
  private drawEnable = false;
  private newShape: any;

  ngAfterViewInit() {
    (<any>window).googleMapsReady = this.onMapsReady.bind(this);
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "http://maps.googleapis.com/maps/api/js?libraries=drawing&key=AIzaSyCHyXQssHcsAhewiXxKRssp3KGpM3MPjC8&v=3&callback=googleMapsReady";
  }

  onMapsReady() {
    let initialPoint = new google.maps.LatLng(-23.5489, -46.6388);
    var mapOptions = {
      scrollwheel: true,
      zoom: 8,
      center: initialPoint
    };
    this.map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

    let drawOptions: google.maps.drawing.DrawingManagerOptions = {
      drawingMode: google.maps.drawing.OverlayType.CIRCLE,
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.CIRCLE],
        position: google.maps.ControlPosition.BOTTOM_CENTER,
      },
      polygonOptions: {
        editable: true
      },
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(drawOptions);
    let self = this;
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
      event.overlay.set('editable', true);
      self.drawingManager.setMap(null);
      self.drawEnable = !self.drawEnable;
      self.newShape = event.overlay;
    });

    var marker = new google.maps.Marker({
      position: initialPoint
    });
    marker.setMap(this.map);
  }

  createFence() {
    this.drawingManager.setMap(!this.drawEnable ? this.map : null);
    this.drawEnable = ! this.drawEnable;
//     if (this.drawEnable) {
//         $('#btnCancelFence, #btnConfirmFence').show();
//     } else {
//         $('#btnCancelFence, #btnConfirmFence').hide();
//     }
  }

  cancelFence() {
    if (this.newShape) {
        this.newShape.setMap(null);
        this.newShape = null;
    }
    this.drawEnable = false;
    this.drawingManager.setMap(null);
//     $('#btnCancelFence, #btnConfirmFence').hide();
  }
  confirmFence() {
    if (this.newShape) {
        console.log('this.newShape', this.newShape);
        this.saveCerca(this.newShape);
        this.newShape.editable = false;
        this.newShape.setMap(null);
        this.newShape.setMap(this.map);
        this.newShape = null;
    }
    this.drawEnable = false;
    this.drawingManager.setMap(null);
    //$('#btnCancelFence, #btnConfirmFence').hide();
  }
  saveCerca(shape) {

  }
}
