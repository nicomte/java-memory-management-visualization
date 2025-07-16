<template>
  <TheoryLayout title="Java Memory Heap">
    <div class="theory-content">
      <p>Der <strong>Memory Heap</strong> ist ein <HoverTerm
          tooltip="Ein Bereich im Speicher, bei dem sich die Grösse und Inhalte während der Programmausführung ändern können.">
          dynamischer Speicherbereich</HoverTerm>, der von <HoverTerm
          tooltip="Java Virtual Machine: Eine virtuelle Maschine, die Java-Programme ausführt und Speicher sowie Ressourcen verwaltet.">
          JVM</HoverTerm> verwaltet wird. In ihm werden <HoverTerm
          tooltip="Datenstruktur, die mehrere Werte des gleichen Typs in fester Reihenfolge speichert.">Arrays
        </HoverTerm> und Objekte von Klassen zur <HoverTerm
          tooltip="Die Daten werden während der Programmausführung angelegt, verändert oder gelöscht – sie sind nicht vorher festgelegt.">
          Laufzeit dynamisch erstellt und verwaltet</HoverTerm>.</p>
      <p>Anders als der Stack, der nur temporäre Werte speichert, speichert der Heap die Daten <HoverTerm
          tooltip="Die gespeicherten Daten bleiben erhalten, solange sie vom Programm verwendet werden.">langfristig
        </HoverTerm>.</p>

      <div class="analogy-box">
        <h4>Alltagsbeispiel</h4>
        <p>Stell dir den Heap wie eine grosse Bücherei vor, und den Stack wie deinen Schreibtisch:</p>
        <ul>
          <li><strong>Die Bücherei (Heap):</strong> Ein riesiger, gemeinsamer Raum, in dem alle Bücher (Objekte)
            aufbewahrt werden. Wenn die Bücherei ein neues Buch kauf (ein Objekt erstellst), wird es dort in den Regalen
            eingeordnet. Die Bücher bleiben so lange dort, bis sie niemand mehr braucht (keine Referenz mehr).</li>
          <li><strong>Dein Schreibtisch (Stack):</strong> Ein kleiner, persönlicher Bereich, auf dem du schnell Notizen
            (primitive Variablen) machst oder Liste von Büchern (Referenzen) ablegst, die du von der Bücherei ausleihen
            willst. Verlässt du den Raum (Methode endet), wird dein Schreibtisch komplett abgeräumt, du siehst ihn nicht
            mehr.</li>
        </ul>
        <p>Da der Stack viel kleiner ist, als der Heap ist im Stack jeweils nur eine Referenz auf die Speicheradresse im
          Heap hinterlegt, wo sich das Objekt befindet.</p>
      </div>

      <div class="theory-content">
        <h3>Objekte im Heap</h3>
        <p>Der Heap speichert alle Objekte, die mit <code>new</code> erstellt werden, sowie ihre Instanzvariablen.</p>


        <pre class="code-example">
class Buch {
    int seitenzahl;
}

public class Main {
    public static void main(String[] args) {
        Buch <span class="highlight-text">meinBuch</span> = <code>new</code> Buch();  // Speicherzuweisung / Objekterstellung im Heap
        <span class="highlight-text">meinBuch</span>.seitenzahl = 350; // Wert der Instanzvariablen für das Buch im Heap zuweisen
    }
}</pre>
      </div>


      <div class="example-box">
        <ul>
          <li>Mit <code>new</code> wird ein neues <strong>Buch-Objekt</strong> erstellt.
            Das ist wie ein neues Buch, das in der Bücherei (Heap) eingeordnet wird</li>
          <li>Die Referenzvariable <strong>meinBuch</strong> liegt im Stack und enthält eine Referenz auf das
            erstellte Buch-Objekt im Heap.
            Das ist wie ein Ausleihzettel (im Stack), der auf das Buch im Regal zeigt.</li>
          <li>Die Eigenschaft <strong>seitenzahl</strong> ist eine Instanzvariable des Objekts.
            Das ist wie die Anzahl der Seiten im Buch. Der Wert <strong>350</strong> wird direkt im Buch
            gespeichert, man sieht erst wie viele Seitenzahlen das Buch hat wenn man es öffnet.</li>
        </ul>
      </div>


      <div class="theory-content">
        <h2>Inhalte des Heaps:</h2>
        <div class="two-column-layout">
          <div class="column">
            <div class="example-box">
              <ul>
                <li><strong>Objekte: </strong>
                  <HoverTerm
                    tooltip="Ein Element, das von einer Klasse erstellt wurde. Z.B. Anna die von der Klasse Person erzeugt wurde">
                    Instanzen</HoverTerm> von Klassen (neue Objekte mit <code>new</code> erstellt) mit ihren <HoverTerm
                    tooltip="Daten, die zu einem bestimmten Objekt gehören. z.b Alter, grösse, etc.">Instanzvariablen
                  </HoverTerm>
                </li>
                <li><strong>Instanzvariablen:</strong> Eigenschaften eines Objekts, wie zum Beispiel die Setenzahl, der
                  Autor von einem Buch.</li>
                <li><strong>Arrays:</strong> Auch wenn sie <HoverTerm
                    tooltip="Einfache Datentypen wie int, float, boolean">primitive Werte</HoverTerm> enthalten, ist das
                  Array-Objekt selbst im Heap</li>
                <li><strong>Strings:</strong> String-Objekte werden im Heap gespeichert (mit String-Pool-Optimierungen)
                </li>
                <li>
                  <HoverTerm
                    tooltip="Zusammengesetzte Strukturen wie Listen, Maps oder Sets, die mehrere Werte enthalten können.">
                    <strong>Komplexe Datenstrukturen:</strong>
                  </HoverTerm> Listen, Maps und alle anderen Kollektionen
                </li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="visual-container">
              <div class="visual-fallback">
                <pre>
          ┌─────────────────────────────────┐
          │            HEAP                 │
          │  ┌───────────┐  ┌─────────────┐ │
          │  │ String    │  │ Buch        │ │
          │  │ "Hallo"   │  │ titel="Java"│ │
          │  └───────────┘  │ seiten=125  │ │
          │                 └─────────────┘ │
          │  ┌───────────┐                  │
          │  │ int[]     │  ┌─────────────┐ │
          │  │ [3,1,4,2] │  │  ArrayList  │ │
          │  └───────────┘  └─────────────┘ │
          └─────────────────────────────────┘</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="example-box">
        <h2>Wie sind Heap und Stack verknüpft?</h2>
        <ul>
          <li><strong>Lokale Variablen</strong> (primitive Typen & Referenzen) sind wie Notizen auf deinem persönlichen
            Zettel (Stack)</li>
          <li><strong>Objekte und Instanzvariablen</strong> sind wie die Bücher selbst und ihre Inhalte (im Heap)</li>
          <li><strong>Methodenende:</strong> Wenn du den Leseraum verlässt (Methode endet), wird dein Notizzettel
            weggeworfen (Stack-Frame gelöscht), aber die Bücher bleiben in den Regalen (Heap), solange noch jemand einen
            Ausleihzettel dafür hat</li>
        </ul>
        <p>Das bedeutet: Solange ein Buch (Objekt oder Array) noch von irgendjemandem gelesen wird (eine Referenz hat),
          bleibt es in der Bücherei (Heap). Erst wenn niemand mehr darauf verweist, kann es aussortiert werden.</p>

        <h3>Stack vs. Heap</h3>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Eigenschaft</th>
                <th>Stack</th>
                <th>Heap</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Was wird gespeichert?</strong></td>
                <td>Primitive Werte, Referenzen</td>
                <td>Objekte, Arrays</td>
              </tr>
              <tr>
                <td><strong>Lebensdauer</strong></td>
                <td>Nur während der Methode</td>
                <td>Solange Referenzen existieren</td>
              </tr>
              <tr>
                <td><strong>Zugriff</strong></td>
                <td>Nur auf aktuellen Stack Frame</td>
                <td>Global zugänglich</td>
              </tr>
              <tr>
                <td><strong>Freigabe</strong></td>
                <td>Automatisch</td>
                <td>Garbage Collector</td>
              </tr>
              <tr>
                <td><strong>Geschwindigkeit</strong></td>
                <td>Sehr schnell</td>
                <td>Langsamer</td>
              </tr>
              <tr>
                <td><strong>Fehlermeldung bei Überlauf</strong></td>
                <td><code>StackOverflowError</code></td>
                <td><code>OutOfMemoryError</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="memory-leaks-detail">
        <h3>Memory Leaks</h3>
        <p>Wenn Objekte unnötig <HoverTerm
            tooltip="Wenn im Programm darauf gezeigt wird / es einen Vermerk darauf gibt">referenziert</HoverTerm>
          bleiben, können sie nicht gelöscht werden. Obwohl sie nicht mehr gebraucht werden, belegen sie weiterhin
          Speicher. Dieses Problem nennt man Memory Leak (Speicherleck).</p>

        <div class="analogy-box">
          <h4>Alltagsbeispiel</h4>
          <p>Stell dir vor, ein Student hat einen Ausleihzettel für ein Fachbuch, das er längst nicht mehr liest. Er hat
            den Zettel in einer Schublade vergessen und verlässt die Universität. Das Buch bleibt in der Bücherei und
            belegt wertvollen Platz, obwohl es niemand mehr braucht - aber der Bibliothekar kann es nicht entfernen,
            weil formal noch ein Ausleihzettel existiert.</p>
        </div>


        <div class="important-note">
          <h4>Probleme:</h4>
          <ul>
            <li><strong>OutOfMemoryError:</strong> Wenn der Heap voll ist und die Garbage Collection nicht genug
              Speicher
              freigeben kann, wird ein OutOfMemoryError ausgelöst - wie wenn deine Bücherei keinen Platz mehr für neue
              Bücher hat.</li>
            <li><strong>Referenzen auf Objekte müssen gelöscht werden:</strong> Objekte werden nicht automatisch
              gelöscht,
              wenn sie nicht mehr verwendet werden - sie müssen für die Garbage Collection nicht mehr referenziert sein.
              Wie ein Buch, das niemand mehr ausleihen will. Sonst bleiben die Objekte im Speicher erhlaten und belegen
              Speicherplatz im Heap.</li>
            <li><strong>Speicher-Leaks:</strong> Wenn Objekte unnötig referenziert bleiben, können Speicherlecks
              entstehen, auch in Java. Das ist wie Bücher, die niemand mehr liest, aber trotzdem nicht aussortiert
              werden
              können, weil jemand sie theoretisch noch lesen könnte.</li>
          </ul>
        </div>
      </div>


      <div class="summary-section">
        <h3>Zusammenfassung:</h3>
        <p>Der Heap ist wie eine grosse Bibliothek für alle Objekte in einem Java-Programm. Im Gegensatz zum Stack, der
          sich automatisch leert, benötigt der Heap einen "Hausmeister" (den Garbage Collector), der regelmässig
          aufräumt.</p>
        <ul>
          <li>Mit <code>new</code> wird ein neues Objekt im Heap erstellt</li>
          <li>Referenzen sind im Stack zeigen auf Objekte im Heap - sie sind nicht die Objekte selbst</li>
          <li>Speicherplatz kann erst freigegeben werden, wenn keine Referenz mehr auf das Objekt zeigt</li>
        </ul>
      </div>


      <button @click="showAdvanced = !showAdvanced" class="toggle-advanced">
        {{ showAdvanced ? 'Weniger anzeigen' : 'Für Fortgeschrittene' }}
      </button>

      <div v-if="showAdvanced" class="advanced-section">

        <h2>Garbage Collection</h2>
        <p>Beim Heap wird der Speicher nicht mehr verwendeter Objekte automatisch vom Garbage Collector freigegeben.
          Das
          bedeutet, wenn im Code keine Referenz mehr auf ein Objekt verweist, wird es als "unreachable"
          (unerreichbar)
          markiert und entfernt.</p>

        <div class="two-column-layout">
          <div class="column">
            <pre class="code-example">
public class Beispiel {
    public static void main(String[] args) {
        // Buch wird erstellt und im Heap abgelegt
        Buch <span class="highlight-text">javaBuch</span> = new Buch("<span class="highlight-text-red">Java Grundlagen</span>");
        
        System.out.println(javaBuch.titel);
        
        // Referenz wird überschrieben
        <span class="highlight-text">javaBuch</span> = new Buch("<span class="highlight-text-red">Java Fortgeschritten</span>");
        
        // Das erste Buch hat keine Referenz mehr
        // und ist bereit für den Garbage Collector
    }
}

class Buch {
    String titel;
    
    public Buch(String titel) {
        this.titel = titel;
    }
}</pre>
          </div>

          <div class="column">
            <div class="visual-container">
              <div class="visual-fallback">
                <pre>
Vor der Neuzuweisung:      Nach der Neuzuweisung:
┌──────────────┐           ┌───────────────────┐
│ <span class="highlight-text">javaBuch</span>     │           │ <span class="highlight-text">javaBuch</span>          │
└──────┬───────┘           └─────────┬─────────┘
       │                             │
       ▼                             ▼
┌──────────────┐           ┌───────────────────┐
│ Buch         │           │ Buch              │
│"<span class="highlight-text-red">Java</span>         │           │"<span class="highlight-text-red">Java</span>              │
│ <span class="highlight-text-red">Grundlagen</span>"  │           │ <span class="highlight-text-red">Fortgeschritten</span>"  │
└──────────────┘           └───────────────────┘
                          
                           ┌───────────────────┐
                           │ Buch              │
                           │"Java Grundlagen"  │
                           │(keine Referenz)   │
                           │→ GC bereit        │
                           └───────────────────┘</pre>
              </div>
            </div>
          </div>
          <div class="analogy-box">
            <h4>So funktioniert Garbage Collection - Alltagsbeispiel:</h4>
            <p>Stell dir vor, der Heap ist eine grosse Bibliothek und der Garbage Collector ein fleissiger
              Bibliothekar:
            </p>
            <ol>
              <li><strong>Identifikation:</strong> Der Bibliothekar prüft, welche Bücher (Objekte) keinen
                Ausleihzettel
                (keine Referenzen) mehr haben, also niemand mehr auf sie zeigt oder sie benutzt.</li>
              <li><strong>Markieren:</strong> Bücher, die noch auf einem Ausleihezettel stehen und dadurch noch von
                jemandem ausgeliehen werden (erreichbare Objekte), bekommen ein Lesezeichen.</li>
              <li><strong>Aussortieren/Löschen:</strong> Bücher ohne Lesezeichen (nicht erreichbare Objekte) werden
                aus
                den Regalen entfernt.</li>
              <li><strong>Neu ordnen:</strong> Die Regale werden neu geordnet, um Platz zu schaffen
                (Speicherkomprimierung).</li>
            </ol>
            <p>Dieser Prozess geschieht automatisch und in regelmässigen Abständen, er kann allerdings manchmal zu
              kurzen
              Pausen in der Programmausführung führen. Das kann man sich ähnlich vorstellen, wie wenn die Bibliothek
              kurz
              schliesst, um aufzuräumen.</p>
          </div>
        </div>


        <h2></h2>

        <h2>String-Pool: Eine Besonderheit im Heap</h2>

        <p>Java optimiert die Speicherung von Strings durch einen speziellen Bereich im Heap, den
          <strong>String-Pool</strong>.
        </p>
        <p>Stell dir den String-Pool wie ein besonderes Bücherregal vor in dem nur für häufig verwendete Bücher
          abgelegt werden:</p>
        <p>Wenn man zwei verschiedenen Variablen den gleichen Stirn zuweist, zeigen s1 und s2 auf denselben String im
          Pool – es wird nur ein Objekt erzeugt.</p>
        <p>Das kann man sich vorstellen wie, wenn du ein Buch (String) mit dem gleichen Titel (Inhalt) ausleihst, wird
          es nicht erneut gekauft, sondern du bekommst das bereits vorhandene Exemplar.</p>

        <pre class="code-example">
String s1 = "<span class="highlight-text">Java</span>";       // Wird im String-Pool abgelegt
String s2 = "<span class="highlight-text">Java</span>";       // Greift auf das gleiche Buch im Pool zu
String s3 = new String("<span class="highlight-text-red">Java</span>");  // Erstellt eine neue Kopie des Buches ausserhalb des Pools

System.out.println(s1 == s2);     // true - beide haben denselben Ausweis
System.out.println(s1 == s3);     // false - unterschiedliche Ausweise
System.out.println(s1.equals(s3)); // true - gleicher Inhalt, aber verschiedene Exemplare</pre>

        <div class="two-column-layout">
          <div class="column">


            <h3>Spezialfall</h3>
            <p>Mit dem befehl new String, kann im Heap ein String ausserhalb des String-Pools erstellt werden. Das
              ist, als würden zwei Studenten (s1 und s2) das gleiche Bibliotheksbuch ausleihen, während ein dritter
              (s3) eine private Kopie kauft.</p>
          </div>

          <div class="column">
            <div class="visual-container">
              <div class="visual-fallback">
                <pre>
HEAP:
┌─────────────────────────────────┐
│                                 │
│ ┌───────────────────┐           │
│ │    String-Pool    │           │
│ │  ┌─────────────┐  │           │
│ │  │   "<span class="highlight-text">Java</span>"    │◀─┼──── s1    │
│ │  └─────────────┘  │      s2   │
│ │                   │           │
│ └───────────────────┘           │
│                                 │
│                                 │
│ ┌─────────────────┐             │
│ │     "<span class="highlight-text-red">Java</span>"      │◀─────── s3  │
│ └─────────────────┘             │
│                                 │
└─────────────────────────────────┘
            </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </TheoryLayout>
</template>

<script>
import TheoryLayout from './TheoryLayout.vue';
import HoverTerm from '../HoverTerm.vue';

export default {
  name: 'MemoryHeapTheory',
  components: {
    TheoryLayout,
    HoverTerm
  },
  data() {
    return {
      showAdvanced: false
    }
  }
}
</script>
