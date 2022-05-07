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
                        <h5>Crawl the web to fetch name origins</h5>
                        <p>The second version of my ML model will use the origin of names as a feature. For this, I need to augment my current training data ( a list of names) with the origin of those names. I built a simple webcrawler to automatically query websites and grab the origin of the names I have. I left it running for about 4hrs and sorted!</p>
                    </ListGroup.Item>
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
                            . </p> Note that I still have the lambda "cold start" latency, where the first request takes much longer than the subsequent requests. 
                            One way to improve this is to use <a href="https://aws.amazon.com/blogs/aws/new-provisioned-concurrency-for-lambda-functions/"> provisioned concurrency</a>. But this will increase my AWS bill, so I shall wait till its really needed. 

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>Build API to fetch recommended names from a trained model</h5>
                        <p>I used Lambda running a Docker container with ScikitLearn built in. It has my trained model baked into the Docker container that it can just load to predict a class. 
                            Then I use S3 Select to query a full list of names that have been pre-classified.</p>
                    </ListGroup.Item>                 
                    <ListGroup.Item>
                        <h5>Build ML model (version 1)</h5>
                        <p>I used Scikitlearn to train a simple k-means clustering algorithm. Then, I used joblib to persist the trained model that can be used by a backend server/Lambda.</p>
                    </ListGroup.Item>
                </ListGroup>
            </Article>
        </Page>
    )
}