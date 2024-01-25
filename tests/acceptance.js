export const TEST_HTML = `<div class="container">
<header><h1 class="p-1">JRPN Calculator</h1></header>
<div id="main">
  <div id="app">
    <div class="form-group row">
      <div class="col-sm"><label for="expression" class="form-label col-form-label">Expression</label><input type="text" id="expression" name="expression" class="w-100 form-control" /></div>
    </div>
    <div class="form-group row mt-2">
      <div class="col-sm"><label for="output" class="output form-label col-form-label">Output</label><textarea id="output" name="output" readonly="readonly" class="w-100 form-control"></textarea></div>
    </div>
    <div class="form-group row">
      <div class="col-sm-4"><button id="button-calculate" class="w-100 btn btn-primary mt-2" type="button">Calculate</button></div>
      <div class="col-sm-4"><button id="button-reset" class="w-100 btn btn-outline-primary mt-2" type="button">Clear</button></div>
      <div class="col-sm-4"><button id="button-help" class="w-100 btn btn-outline-info mt-2" type="button">Help</button></div>
    </div>
    <div id="help">
      <h2>Help</h2>
      <p>Reverse Polish Notation (RPN) is a mathematical notation in which every operator follows all of its operands. It is also known as postfix notation. The description <q>Polish</q> refers to the nationality of logician Jan Lukasiewicz, who invented (prefix) Polish notation in the 1920's.</p>
      <p><strong>Examples</strong></p>
      <table class="table table-striped">
        <tr>
          <th>Infix Notation</th><th>Reverse Polish Notation</th>
        </tr>
        <tr>
          <td>
            <math>
              <mn>1</mn>
              <mo>+</mo>
              <mn>2</mn>
            </math>
          </td>
          <td>
            <math>
              <mn>1</mn>
              <mn>2</mn>
              <mo>+</mo>
            </math>
          </td>
        </tr>
        <tr>
          <td>
            <math>
              <mn>1</mn>
              <mo>+</mo>
              <mn>2</mn>
              <mo>+</mo>
              <mn>3</mn>
            </math>
          </td>
          <td>
            <math>
              <mn>1</mn>
              <mn>2</mn>
              <mo>+</mo>
              <mn>3</mn>
              <mo>+</mo>
            </math>
          </td>
        </tr>
        <tr>
          <td>
            <math>
              <mn>5</mn>
              <mo>&InvisibleTimes;</mo>
              <mfenced>
                <mrow>
                  <mn>1</mn>
                  <mo>+</mo>
                  <mn>2</mn>
                  <mo>+</mo>
                  <mn>3</mn>
                </mrow>
              </mfenced>
            </math>
          </td>
          <td>
            <math>
              <mn>5</mn>
              <mn>1</mn>
              <mn>2</mn>
              <mo>+</mo>
              <mn>3</mn>
              <mo>+</mo>
              <mo>*</mo>
            </math>
          </td>
        </tr>
        <tr>
          <td>
            <math>
              <mfenced>
                <mrow>
                  <mn>5</mn>
                  <mo>&InvisibleTimes;</mo>
                  <mfenced>
                    <mrow>
                      <mn>1</mn>
                      <mo>+</mo>
                      <mn>2</mn>
                      <mo>+</mo>
                      <mn>3</mn>
                    </mrow>
                  </mfenced>
                </mrow>
              </mfenced>
              <mo>-</mo>
              <mn>8</mn>
            </math>
          </td>
          <td>
            <math>
              <mn>5</mn>
              <mn>1</mn>
              <mn>2</mn>
              <mo>+</mo>
              <mn>3</mn>
              <mo>+</mo>
              <mo>*</mo>
              <mn>8</mn>
              <mo>-</mo>
            </math>
          </td>
        </tr>
        <tr>
          <td>
            <math>
              <mfrac>
                <mrow>
                  <mfenced>
                    <mrow>
                      <mn>5</mn>
                      <mo>&InvisibleTimes;</mo>
                      <mfenced>
                        <mrow>
                          <mn>1</mn>
                          <mo>+</mo>
                          <mn>2</mn>
                          <mo>+</mo>
                          <mn>3</mn>
                        </mrow>
                      </mfenced>
                    </mrow>
                  </mfenced>
                  <mo>-</mo>
                  <mn>8</mn>
                </mrow>
                <mn>13</mn>
              </mfrac>
            </math>
          </td>
          <td>
            <math>
              <mn>5</mn>
              <mn>1</mn>
              <mn>2</mn>
              <mo>+</mo>
              <mn>3</mn>
              <mo>+</mo>
              <mo>*</mo>
              <mn>8</mn>
              <mo>-</mo>
              <mn>13</mn>
              <mo>/</mo>
            </math>
          </td>
        </tr>
      </table>
      <p><strong>Variables</strong></p>
      <table class="table table-striped">
        <tr>
          <th>Variable</th><th>Description</th>
        </tr>
        <tr>
          <td>x</td><td>Previous Output</td>
        </tr>
      </table>
      <p><strong>Constants</strong></p>
      {{constants-table}}
      <p><strong>Functions</strong></p>
      <table class="table table-striped">
        <tr>
          <th>Function</th><th>Description</th>
        </tr>
        <tr>
          <td>pow(b,n)</td><td>Exponentiation: <math><msup><mi>b</mi><mi>n</mi></msup></math></td>
        </tr>
        <tr>
          <td>sqrt(x)</td><td>Square Root: <math><msqrt><mi>x</mi></msqrt></math></td>
        </tr>
        <tr>
          <td>nrt(x,n)</td><td>Nth Root: <math><mroot><mi>x</mi><mi>n</mi></mroot></math></td>
        </tr>
        <tr>
          <td>sin(x)</td><td>Sine: <math><mi>sin</mi><mo>&ApplyFunction;</mo><mi>x</mi></math></td>
        </tr>
        <tr>
          <td>cos(x)</td><td>Cosine: <math><mi>cos</mi><mo>&ApplyFunction;</mo><mi>x</mi></math></td>
        </tr>
        <tr>
          <td>tan(x)</td><td>Tangent: <math><mi>tan</mi><mo>&ApplyFunction;</mo><mi>x</mi></math></td>
        </tr>
        <tr>
          <td>asin(x)</td><td>Arcsine: <math><mi>asin</mi><mo>&ApplyFunction;</mo><mi>x</mi></math></td>
        </tr>
        <tr>
          <td>acos(x)</td><td>Arccosine: <math><mi>acos</mi><mo>&ApplyFunction;</mo><mi>x</mi></math></td>
        </tr>
        <tr>
          <td>atan(x)</td><td>Arctangent: <math><mi>atan</mi><mo>&ApplyFunction;</mo><mi>x</mi></math></td>
        </tr>
      </table>
    </div>
  </div>
</div>
<footer><p><span id="description"></span> Copyright &#169; <span id="author"></span></p></footer>
</div>`;