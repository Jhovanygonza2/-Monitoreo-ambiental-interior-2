// Dart / Flutter Example
// Ideal para apps móviles de movilidad.

import 'package:flutter/material.dart';

void main() {
  runApp(const MobilityApp());
}

class MobilityApp extends StatelessWidget {
  const MobilityApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(child: Text('Mobility Dashboard')),
      ),
    );
  }
}
