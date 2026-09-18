
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import '../config.dart';
import '../services/api.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  GoogleMapController? _map;
  LatLng? _pickup;
  LatLng? _destination;
  bool _loading=false;
  String _message='Pilih titik tujuan di peta';

  @override
  void initState() {
    super.initState();
    _initLocation();
  }

  Future<void> _initLocation() async {
    final ok=await Geolocator.isLocationServiceEnabled();
    if(!ok){ setState(()=>_message='Aktifkan GPS terlebih dahulu'); return; }
    var p=await Geolocator.checkPermission();
    if(p==LocationPermission.denied) p=await Geolocator.requestPermission();
    if(p==LocationPermission.denied || p==LocationPermission.deniedForever){
      setState(()=>_message='Izin lokasi diperlukan untuk memesan'); return;
    }
    final pos=await Geolocator.getCurrentPosition();
    final here=LatLng(pos.latitude,pos.longitude);
    setState(()=>_pickup=here);
    _map?.animateCamera(CameraUpdate.newLatLngZoom(here,16));
  }

  Future<void> _order() async {
    if(_pickup==null || _destination==null){
      setState(()=>_message='Tentukan titik tujuan terlebih dahulu'); return;
    }
    setState(()=>_loading=true);
    try {
      final result=await Api.createOrder(
        pickupLat:_pickup!.latitude, pickupLng:_pickup!.longitude,
        destinationLat:_destination!.latitude, destinationLng:_destination!.longitude,
      );
      if(!mounted) return;
      showDialog(context:context,builder:(_)=>AlertDialog(
        title:const Text('Pesanan dibuat'),
        content:Text('Order: ${result['id']}\nStatus: ${result['status']}\nPerkiraan tarif: Rp ${result['estimated_fare'] ?? '-'}'),
        actions:[TextButton(onPressed:()=>Navigator.pop(context),child:const Text('OK'))],
      ));
    } catch(e) {
      setState(()=>_message='Gagal membuat pesanan: $e');
    } finally { if(mounted) setState(()=>_loading=false); }
  }

  @override
  Widget build(BuildContext context) {
    final markers=<Marker>{
      if(_pickup!=null) Marker(markerId:const MarkerId('pickup'),position:_pickup!,infoWindow:const InfoWindow(title:'Jemput')),
      if(_destination!=null) Marker(markerId:const MarkerId('destination'),position:_destination!,infoWindow:const InfoWindow(title:'Tujuan')),
    };
    return Scaffold(
      appBar:AppBar(title:const Text('GasKuy')),
      body:Stack(children:[
        GoogleMap(
          initialCameraPosition:const CameraPosition(target:LatLng(-6.9175,107.6191),zoom:12),
          myLocationEnabled:true, myLocationButtonEnabled:true,
          markers:markers,
          onMapCreated:(c)=>_map=c,
          onTap:(p)=>setState(()=>_destination=p),
        ),
        Positioned(top:12,left:12,right:12,child:Card(
          child:Padding(padding:const EdgeInsets.all(12),child:Column(
            crossAxisAlignment:CrossAxisAlignment.start,
            children:[
              const Text('GasKuy Motor',style:TextStyle(fontWeight:FontWeight.bold,fontSize:18)),
              const SizedBox(height:4),
              Text(_destination==null?_message:'Tujuan dipilih. Tekan Pesan GasKuy.'),
            ],
          )),
        )),
        Positioned(left:16,right:16,bottom:20,child:SizedBox(
          height:52,
          child:ElevatedButton(
            onPressed:_loading?null:_order,
            child:_loading?const CircularProgressIndicator():const Text('PESAN GASKUY'),
          ),
        )),
      ]),
    );
  }
}
