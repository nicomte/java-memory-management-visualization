<template>
  <TheoryLayout title="Method Area">
    <div class="theory-content">
      <div class="important-note">
        <div class="two-column-layout">
          <div class="column">
            <br>
            <p>
              Die <strong>Method Area</strong> (auch als „Metadatenbereich“ bezeichnet) ist ein Bereich im Speicher der
              <HoverTerm tooltip="Java Virtual Machine – das Programm, das Java-Code ausführt.">JVM</HoverTerm>, in dem
              Informationen
              über geladene <HoverTerm
                tooltip="Ein Bauplan für Objekte. Eine Klasse beschreibt, welche Eigenschaften (Felder) und Fähigkeiten (Methoden) ein Objekt hat.">
                Klassen</HoverTerm> gespeichert werden – z.B. welche Methoden es gibt, welche Felder deklariert wurden
              und
              welche <HoverTerm
                tooltip="Werte, die mit dem Schlüsselwort static deklariert wurden. Diese gehören zur Klasse selbst, nicht zu einzelnen Objekten.">
                statischen Variablen</HoverTerm> existieren.
            </p>
            <h3></h3>

            <h4>Funktion im Gesamtsystem:</h4>
            <p>
              Ohne die Method Area wüsste die JVM nicht, wie Klassen aufgebaut sind, wie Methoden funktionieren oder wo
              Konstanten liegen. Sie ist ein zentrales Bindeglied zwischen dem Code und seiner Ausführung in der JVM.
            </p>
          </div>

          <div class="column">

            <pre>
          ┌─────────────────────────────────────┐
          │           METHOD AREA               │
          │                                     │
          │  ┌─────────────────────────────┐    │
          │  │ Klasse: Student             │    │
          │  │ - Statische Felder          │    │
          │  │ - Methodencode              │    │
          │  │ - Konstantenpool            │    │
          │  └─────────────────────────────┘    │
          │                                     │
          │  ┌─────────────────────────────┐    │
          │  │ Klasse: Calculator          │    │
          │  │ - Statische Felder          │    │
          │  │ - Methodencode              │    │
          │  │ - Konstantenpool            │    │
          │  └─────────────────────────────┘    │
          └─────────────────────────────────────┘ </pre>
          </div>
        </div>
      </div>


      <h3>Inhalte der Method Area:</h3>
      <div class="content-grid">
        <div class="content-item">
          <h4>1. Klassenmetadaten</h4>
          <ul>
            <li>Vollständiger Klassenname und Paketinformationen</li>
            <li>
              <HoverTerm
                tooltip="Eine Hierarchie, bei der Klassen voneinander erben können, also Methoden und Felder übernehmen.">
                Vererbungshierarchie</HoverTerm> (z.B. Superklasse, Interfaces)
            </li>
            <li>
              <HoverTerm tooltip="Spezielle Methoden, die beim Erzeugen von Objekten automatisch aufgerufen werden.">
                Konstruktoren</HoverTerm> und Methodeninfos
            </li>
            <li>
              <HoverTerm
                tooltip="Welche Typen (z.B. int, String) verwendet werden, und wer worauf zugreifen darf (z.B. public/private).">
                Typen und Zugriffsbeschränkungen</HoverTerm>
            </li>
            <li>Weitere <HoverTerm
                tooltip="Daten über Daten – zusätzliche Infos wie Annotationen, die zur Laufzeit oder vom Compiler genutzt werden können.">
                Metadaten</HoverTerm>
            </li>
          </ul>
        </div>

        <div class="content-item">
          <h4>2. Statische Variablen</h4>
          <ul>
            <li>Alle Felder, die mit <code>static</code> deklariert wurden</li>
            <li>
              <HoverTerm
                tooltip="Eine Konstante ist ein fester Wert, der sich nie ändert. Mit static final wird er einmalig definiert.">
                Klassenweite Konstanten</HoverTerm> (<code>static final</code>)
            </li>
            <li>Daten, die für alle Objekte der Klasse gleich sind</li>
            <li>z.B. <code>Math.PI</code> oder <code>Integer.MAX_VALUE</code></li>
          </ul>
        </div>

        <div class="content-item">
          <h4>3. Methoden-Bytecode</h4>
          <ul>
            <li>
              <HoverTerm tooltip="Maschinenlesbarer Zwischencode, den die JVM ausführt.">Kompilierter Bytecode
              </HoverTerm> aller Methoden
            </li>
            <li>Anweisungen, wie Methoden intern ablaufen</li>
            <li>Sowohl <HoverTerm
                tooltip="Methoden, die ohne Objekt aufgerufen werden können. Sie sind mit static deklariert.">
                statische
              </HoverTerm> als auch <HoverTerm tooltip="Methoden, die mit einem Objekt arbeiten und nicht static sind.">
                Instanzmethoden</HoverTerm>
            </li>
            <li>
              <HoverTerm tooltip="Verbindungen zu nativen Methoden außerhalb von Java, z.B. in C.">JNI-Verknüpfungen
              </HoverTerm> für native Funktionen
            </li>
          </ul>
        </div>

        <div class="content-item">
          <h4>4. Konstantenpool</h4>
          <ul>
            <li>Alle <HoverTerm tooltip="Ein fester Textwert, z.B. &quot;Hallo Welt&quot;.">String-Literale
              </HoverTerm>
              und <HoverTerm tooltip="Feste Zahlenwerte wie 3.14 oder 42.">numerischen Konstanten</HoverTerm>
            </li>
            <li>
              <HoverTerm tooltip="Ein symbolischer Platzhalter für eine Klasse oder Methode, bevor sie aufgelöst wird.">
                Symbolische Verweise</HoverTerm> auf Klassen und Methoden
            </li>
            <li>Methodennamen, Feldnamen, Typbeschreibungen</li>
          </ul>
        </div>
      </div>

      <div class="example-box">
        <h4>Praktisches Beispiel:</h4>
        <pre class="code-example">
public class MethodAreaExample {
    public static int counter = 0;
    public static final String APP_NAME = "Memory Visualizer";

    public static void incrementCounter() {
        counter++;
        System.out.println("Counter: " + counter);
    }

    public void printMessage(String message) {
        System.out.println("Message: " + message);
    }

    public static void main(String[] args) {
        incrementCounter();
        MethodAreaExample example = new MethodAreaExample();
        example.printMessage("Hello World");
    }
}</pre>
        <div class="example-explanation">
          <p><strong>Was passiert im Hintergrund?</strong></p>
          <ol>
            <li>Beim Laden der Klasse <code>MethodAreaExample</code> speichert die JVM alle Klasseninformationen in
              der
              Method Area.</li>
            <li>Die <HoverTerm
                tooltip="Variablen, die mit static deklariert wurden und nicht zu einem bestimmten Objekt gehören.">
                statische Variable</HoverTerm> <code>counter</code> wird initialisiert.</li>
            <li>Die Konstante <code>APP_NAME</code> landet im Konstantenpool.</li>
            <li>Der Bytecode aller Methoden wird bereitgestellt.</li>
            <li>Das Objekt wird im Heap erzeugt – aber die Strukturdefinition stammt aus der Method Area.</li>
          </ol>
        </div>
      </div>

      <div class="comparison-section">
        <h3>Method Area vs. Heap vs. Stack:</h3>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Speicherbereich</th>
                <th>Gespeicherte Daten</th>
                <th>Lebensdauer</th>
                <th>Speicherverwaltung</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Method Area</strong></td>
                <td>Klasseninformationen, statische Variablen, Bytecode</td>
                <td>Solange die Klasse geladen ist</td>
                <td>Laden bei Bedarf, Entladen bei Bedarf</td>
              </tr>
              <tr>
                <td><strong>Heap</strong></td>
                <td>Objekte, Arrays, Instanzdaten</td>
                <td>Solange Referenzen bestehen</td>
                <td>
                  <HoverTerm tooltip="Automatische Speicherbereinigung – Objekte ohne Verweise werden gelöscht.">
                    Garbage
                    Collection</HoverTerm>
                </td>
              </tr>
              <tr>
                <td><strong>Stack</strong></td>
                <td>Lokale Variablen, Methodenparameter</td>
                <td>Während der Methodenausführung</td>
                <td>Automatisch beim Methodenende</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="two-column-layout">
        <div class="column">

          <div class="important-note">
            <h4>Wichtig zu wissen:</h4>
            <ul>
              <li><strong>JVM-spezifisch:</strong> Die genaue Umsetzung der Method Area variiert je nach JVM.</li>
              <li><strong>Fehlergefahr:</strong> Wenn zu viele Klassen geladen werden, kann ein
                <code>OutOfMemoryError: Metaspace</code> auftreten.
              </li>
              <li><strong>Klassenlader:</strong> Die Informationen kommen vom <HoverTerm
                  tooltip="Ein Java-Mechanismus, der Klassen zur Laufzeit lädt.">ClassLoader</HoverTerm>.</li>
            </ul>
          </div>
        </div>
        <div class="column">

          <div class="summary-section">
            <h4>Zusammenfassung:</h4>
            <p>
              Die Method Area ist wie das „Gedächtnis“ der JVM für Klassendefinitionen. Sie enthält alles, was Java
              wissen
              muss, um mit Klassen zu arbeiten: Methoden, Konstanten, statische Variablen und wie Objekte aussehen
              sollen.
            </p>
          </div>
        </div>
      </div>


    </div>
  </TheoryLayout>
</template>

<script>
import TheoryLayout from './TheoryLayout.vue'
import HoverTerm from '../HoverTerm.vue'

export default {
  name: 'MethodAreaTheory',
  components: {
    TheoryLayout,
    HoverTerm
  }
}
</script>


<style scoped>
.content-grid {
  display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1rem 0;
}

.content-item {
  background-color: #f8fafc;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.code-example {
  background-color: #1e1e3f;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  margin: 0.75rem 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.example-explanation {
  margin-top: 0.75rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    /* On smaller screens, switch to one column */
  }
}
</style>