import { Page } from "../components/Page"
import { Article } from "../components/Article"
import { ListGroup, Table } from 'react-bootstrap';


export default function Changelog() {

    return (
        <Page>
            <Article
                heading={"Changelog"}
                articleId={23}
            >
                <ListGroup>
                    <ListGroup.Item>
                        <h5>Reduce latency by factor of x10 to fetch recommended names</h5>
                        <p>I used gzip compression (csv -&gt; csv.gzip) to reduce latency of S3 Select querying the full list of names I have stored in S3.
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>File Format</th>
                                        <th>End to end latency (sec)</th>
                                        <th>File size (KB)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Raw CSV</td>
                                        <td>12.07</td>
                                        <td>157</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Compressed GZIP</td>
                                        <td>0.2sec</td>
                                        <td>48KB</td>
                                    </tr>

                                </tbody>
                            </Table>
                            End to end latency was measured by checking the Chrome network request for fetching recommendations for the name <i>Eve</i>.

                            You can read more about S3 select and optimizing it here on this
                            <a href="https://aws.amazon.com/blogs/storage/querying-data-without-servers-or-databases-using-amazon-s3-select/"> AWS blog post</a>
                            . </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>Build API to fetch recommended names and build version 1 of ML model</h5>
                        <p>Use joblib to dump a trained model (using scikit learn)</p>
                        <p>Lambda running a Docker container with scikit learn to load my trained model and make predictions.</p>
                        <p>S3 Select to query full list of names that have been pre-classified.</p>
                    </ListGroup.Item>
                </ListGroup>
            </Article>
        </Page>
    )
}