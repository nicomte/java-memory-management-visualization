// Array mit allen Quizfragen zur Speicherverwaltung in Java
export const quizQuestions = [
  // Quizfragen
  {
    question: "Was ist der Call Stack?",
    options: [
      "Ein Speicherbereich für dynamisch erzeugte Objekte",
      "Eine Datenstruktur zur Verfolgung von Methodenaufrufen",
      "Ein Bereich zur Speicherung von statischen Variablen",
      "Ein Register, das auf den aktuellen Speicherbereich zeigt"
    ],
    correctAnswer: 1,
    explanation: "Der Call Stack wird von der JVM verwendet, um den Ausführungsverlauf von Methodenaufrufen zu verfolgen."
  },
  {
    question: "Welche Daten werden im Memory Heap gespeichert?",
    options: [
      "Nur primitive Datentypen wie int und boolean",
      "Nur lokale Variablen einer Methode",
      "Objekte und Arrays",
      "Nur statische Variablen"
    ],
    correctAnswer: 2,
    explanation: "Der Memory Heap ist ein dynamischer Speicherbereich, in dem Objekte und Arrays gespeichert werden."
  },
  {
    question: "Was passiert, wenn der Stack voll ist?",
    options: [
      "OutOfMemoryError wird ausgelöst",
      "Die JVM erstellt automatisch einen neuen Stack",
      "Der Garbage Collector gibt Speicher frei",
      "StackOverflowError wird ausgelöst",
    ],
    correctAnswer: 3,
    explanation: "Wenn der Stack voll ist, wird ein StackOverflowError ausgelöst, häufig durch zu tiefe Rekursionen."
  },
  {
    question: "Was zeigt der Stack Pointer an?",
    options: [
      "Die nächste auszuführende Anweisung im Bytecode",
      "Die Grösse des verfügbaren Heap-Speichers",
      "Die aktuelle Position im Stack",
      "Die Adresse des zuletzt erstellten Objekts"
    ],
    correctAnswer: 2,
    explanation: "Der Stack Pointer ist ein Register, das auf die aktuelle Position im Stack zeigt und bei jedem Methodenaufruf aktualisiert wird."
  },
  {
    question: "Was ist die Aufgabe des Instruction Pointers?",
    options: [
      "Er zeigt auf die nächste auszuführende Bytecode-Instruktion",
      "Er verwaltet die Speicherbelegung im Heap",
      "Er identifiziert nicht mehr benötigte Objekte für den Garbage Collector",
      "Er speichert die Adressen aller statischen Variablen"
    ],
    correctAnswer: 0,
    explanation: "Der Instruction Pointer (Program Counter) zeigt auf die nächste auszuführende Bytecode-Instruktion und steuert den Programmfluss."
  },
  {
    question: "Was wird in der Method Area gespeichert?",
    options: [
      "Klassenmetadaten, statische Variablen und Bytecode",
      "Nur lokale Variablen einer Methode",
      "Nur Objekte und ihre Instanzvariablen",
      "Nur Referenzvariablen, die auf den Heap zeigen"
    ],
    correctAnswer: 0,
    explanation: "Die Method Area enthält Klassenmetadaten, statische Variablen und den kompilierten Bytecode aller Methoden."
  },
  {
    question: "Was ist NICHT im Stack Frame enthalten?",
    options: [
      "Lokale Variablen",
      "Parameter der Methode",
      "Instanzvariablen eines Objekts",
      "Rücksprungadresse"
    ],
    correctAnswer: 2,
    explanation: "Instanzvariablen sind Teil eines Objekts und werden im Heap gespeichert, nicht im Stack Frame."
  },
  {
    question: "Welche Aussage zum Garbage Collector ist korrekt?",
    options: [
      "Er gibt den Speicher von lokalen Variablen im Stack frei",
      "Er befreit nicht mehr referenzierte Objekte im Heap",
      "Er muss manuell vom Programmierer aufgerufen werden",
      "Er komprimiert Stack und Heap gleichermassen"
    ],
    correctAnswer: 1,
    explanation: "Der Garbage Collector identifiziert und entfernt Objekte im Heap, auf die keine Referenzen mehr zeigen."
  },
  {
    question: "Warum ist der Zugriff auf den Stack schneller als auf den Heap?",
    options: [
      "Weil der Stack kleiner ist als der Heap",
      "Weil der Stack in einem speziellen Cache gespeichert wird",
      "Weil der Stack nach dem LIFO-Prinzip arbeitet und vorhersehbare Adressierungsmuster hat",
      "Weil der Stack nur primitive Datentypen enthält"
    ],
    correctAnswer: 2,
    explanation: "Der Stack ist schneller, weil er nach dem LIFO-Prinzip arbeitet und dadurch vorhersehbare Speicheradressierungen ermöglicht."
  },
  {
    question: "Was passiert mit lokalen Variablen, wenn eine Methode beendet wird?",
    options: [
      "Sie bleiben im Stack, bis der Garbage Collector sie entfernt",
      "Sie werden in den Heap verschoben",
      "Sie werden zu statischen Variablen",
      "Sie werden automatisch vom Stack entfernt"
    ],
    correctAnswer: 3,
    explanation: "Lokale Variablen werden automatisch vom Stack entfernt, wenn die Methode beendet wird und der Stack Frame gelöscht wird."
  },
  
  {
    question: "Wo werden primitive Datentypen wie int und boolean in Java gespeichert?",
    options: [
      "Immer im Heap",
      "Immer im Stack",
      "Im Stack als lokale Variablen, im Heap als Objektattribute",
      "In der Method Area"
    ],
    correctAnswer: 2,
    explanation: "Primitive Datentypen werden im Stack gespeichert, wenn sie lokale Variablen sind. Als Objektattribute (Instanzvariablen) werden sie im Heap als Teil des Objekts gespeichert."
  },
  {
    question: "Wofür steht 'JVM'?",
    options: [
      "Java Variable Management",
      "Java Virtual Machine",
      "Just-in-time Value Memory",
      "Java Verified Memory"
    ],
    correctAnswer: 1,
    explanation: "Die Java Virtual Machine (JVM) ist die Laufzeitumgebung, in der Java-Programme ausgeführt werden."
  },
  {
    question: "Was ist ein Memory Leak in Java?",
    options: [
      "Wenn die JVM zu wenig Arbeitsspeicher zugewiesen bekommt",
      "Wenn Objekte erstellt werden, aber nie verwendet werden",
      "Wenn Objekte nicht mehr benötigt werden, aber immer noch referenziert werden",
      "Wenn der Garbage Collector fehlerhaft ist"
    ],
    correctAnswer: 2,
    explanation: "Ein Memory Leak in Java tritt auf, wenn Objekte nicht mehr benötigt werden, aber weiterhin referenziert werden, sodass der Garbage Collector sie nicht entfernen kann. Dies führt zu unnötigem Speicherverbrauch."
  },
  {
    question: "Was passiert mit dem Stack Pointer bei einem Methodenaufruf?",
    options: [
      "Er bewegt sich zu einer niedrigeren Adresse",
      "Er bewegt sich zu einer höheren Adresse",
      "Er bleibt unverändert",
      "Er wird auf null zurückgesetzt"
    ],
    correctAnswer: 0,
    explanation: "Da der Stack nach unten wächst, wird der Stack Pointer bei einem Methodenaufruf auf eine niedrigere Adresse verschoben, um Platz für den neuen Stack Frame zu schaffen."
  },
  {
    question: "Wann ist ein Objekt für den Garbage Collector bereit zur Entfernung?",
    options: [
      "Wenn das Objekt explizit mit delete() gelöscht wird",
      "Wenn keine Referenzen mehr auf das Objekt zeigen",
      "Wenn das Objekt die finalize() Methode überschreibt",
      "Wenn das Objekt aus einer Methode zurückkehrt"
    ],
    correctAnswer: 1,
    explanation: "Ein Objekt ist für den Garbage Collector bereit, wenn keine Referenzen mehr darauf zeigen und es somit nicht mehr erreichbar ist (unreachable)."
  },
  {
    question: "Was ist der Hauptunterschied zwischen Stack und Heap?",
    options: [
      "Stack ist persistent, Heap ist temporär",
      "Stack speichert Objekte, Heap speichert primitive Werte",
      "Stack speichert Methodenaufrufe und lokale Variablen, Heap speichert Objekte",
      "Stack ist langsamer als Heap"
    ],
    correctAnswer: 2,
    explanation: "Im Stack werden lokale Variablen und Methodenaufrufe verwaltet, im Heap befinden sich Objekte und ihre Daten."
  },
  {
    question: "Wie wirkt sich ein rekursiver Methodenaufruf auf den Stack aus?",
    options: [
      "Jede Rekursion erstellt einen neuen Stack Frame",
      "Der Stack schrumpft",
      "Der Garbage Collector entfernt alte Frames",
      "Der Stack wird in den Heap ausgelagert"
    ],
    correctAnswer: 0,
    explanation: "Bei jeder rekursiven Methode wird ein neuer Stack Frame angelegt."
  },
  {
    question: "Welche Rolle spielt die Method Area in der JVM?",
    options: [
      "Sie speichert Metadaten über Klassen, Methoden und statische Variablen",
      "Sie speichert lokale Variablen von Methoden",
      "Sie enthält den Bytecode, der gerade ausgeführt wird",
      "Sie ist ein temporärer Speicherbereich für den Garbage Collector"
    ],
    correctAnswer: 0,
    explanation: "Die Method Area enthält Informationen über geladene Klassen, Methoden und statische Variablen und ist ein gemeinsamer Speicherbereich aller Threads."
  },
  {
    question: "Was ist ein Vorteil des Garbage Collectors?",
    options: [
      "Er macht den Code langsamer",
      "Er reduziert die Sicherheit",
      "Er automatisiert die Speicherverwaltung",
      "Er ersetzt den Compiler"
    ],
    correctAnswer: 2,
    explanation: "Durch den Garbage Collector müssen Entwickler Speicher nicht manuell freigeben. Der Garbage Collector entfernt automatisch Objekte im Heap, auf die keine Referenz mehr existiert."
  },
  {
    question: "Was passiert, wenn der Garbage Collector ein Objekt entfernt?",
    options: [
      "Die JVM fährt automatisch herunter",
      "Der Stack Frame der Methode wird gelöscht",
      "Die Klasse wird aus der Method Area entfernt",
      "Der belegte Speicher im Heap wird freigegeben"
    ],
    correctAnswer: 3,
    explanation: "Der Garbage Collector gibt Speicher im Heap frei, wenn ein Objekt nicht mehr referenziert wird."
  }
];
