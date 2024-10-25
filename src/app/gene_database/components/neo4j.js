"use client"

import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line
import NeoVis from "neovis.js/dist/neovis.js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NeoGraph = (props)=>{
    const{
        containerId,
        neo4jUrl,
        neo4jAccount,
        neo4jPassword,
        labels,
        relationships
    }=props;
    const visRef = useRef();

    const [cypher, setCypher] = useState("MATCH (soybean_1:soybean {name: 'S140_609'})-[r1:alt]->(gene:gene)<-[r2:ref]-(soybean_2:soybean {name: 'S140_613_HCJWYCCXY_L6'}) RETURN soybean_1, r1, gene, r2, soybean_2");
    const [currentSelectNode, setCurrentSelectNode] = useState({node_id: "", name: ""});
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const NeoLabels = {};
        const NeoRelations = {};
        for(let i=0;i<labels.length;i++){
            NeoLabels[labels[i]]={
                label:labels[i],
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                    static:{
                        group:labels[i],
                    },
                    function:{
                        title:(node)=> {
                            return NeoVis.objectToTitleHtml(node, Object.keys(node.properties));
                        }
                    }
                }
            }
        }
        for(let i=0;i<relationships.length;i++){
            NeoRelations[relationships[i]]={
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                    function:{
                        label:(relation)=>{
                            return relation.type + '-' + relation.properties.gene_type
                        }
                    }
                }
            }
        }

        const NeoVisConfig = {
            containerId:containerId,
            neo4j:{
                serverUrl:neo4jUrl,
                serverUser:neo4jAccount,
                serverPassword:neo4jPassword
            },
            visConfig:{
                nodes:{
                    shape:"ellipse"
                },
                edges:{
                    arrows:{
                        from:{
                            enabled:false
                        },
                        to:{
                            enabled:true
                        }
                    },
                    color:"black"
                }
            },
            labels:NeoLabels,
            relationships:NeoRelations,
            initialCypher:cypher,

        };
        const vis = new NeoVis(NeoVisConfig);

        vis.render();

    },[containerId,neo4jUrl,neo4jAccount,neo4jPassword,labels,relationships,cypher])
    return(
        <div className="flex flex-col w-full h-full">
            <div className="flex justify-between space-x-8 py-4 h-28">
                <Textarea placeholder={cypher} id="cypher" className="mr-8" defaultValue="S140_609,alt,gene,ref,S140_613_HCJWYCCXY_L6"/>
                <Button
                    className="h-8 bg-primary text-white space-x-2"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                        setLoading(true);
                        let cypher = document.getElementById('cypher').value;
                        if (cypher === "")
                            cypher = "S140_609,alt,gene,ref,S140_613_HCJWYCCXY_L6";
                        cypher = cypher.replaceAll(" ", "");

                        let final_cypher = "MATCH ";
                        let node_list = cypher.split(",");
                        let node_id_list = [];

                        for (let i = 0; i < (node_list.length - 1) / 4; i++) {
                            let soybean_1 = `(soybean_${i * 4}:soybean {name: '${node_list[i * 4]}'})`;
                            if (i === 0)
                                node_id_list.push(`soybean_${i * 4}`);

                            let soybean_2 = `(soybean_${i * 4 + 4}:soybean {name: '${node_list[i * 4 + 4]}'})`;
                            node_id_list.push(`soybean_${i * 4 + 4}`);

                            let relation_1 = `-[r_${i * 4 + 1}:${node_list[i * 4 + 1]}]->`;
                            if (node_list[i * 4 + 1] === "")
                                relation_1 = `-[r_${i * 4 + 1}]->`;

                            node_id_list.push(`r_${i * 4 + 1}`);

                            let relation_2 = `<-[r_${i * 4 + 3}:${node_list[i * 4 + 3]}]-`;
                            if (node_list[i * 4 + 3] === "")
                                relation_2 = `-[r_${i * 4 + 3}]->`;
                            node_id_list.push(`r_${i * 4 + 3}`);

                            let gene = `(gene_${i * 4 + 2}:gene)`;
                            node_id_list.push(`gene_${i * 4 + 2}`);

                            if (i === 0)
                                final_cypher += `${soybean_1}${relation_1}${gene}${relation_2}${soybean_2}`;
                            else
                                final_cypher += `${relation_1}${gene}${relation_2}${soybean_2}`;
                        }
                        final_cypher += " RETURN";
                        for (let i = 0; i < node_id_list.length; i++) {
                            final_cypher += ` ${node_id_list[i]},`;
                        }
                        final_cypher = final_cypher.slice(0, -1);

                        setCypher(final_cypher);
                    }}
                >
                    <i className="fa-duotone fa-magnifying-glass"></i>
                </Button>
            </div>
            <div id={containerId}
                 ref={visRef}
                 className="flex justify-center items-center w-full h-full bg-background rounded-md border">
            </div>
        </div>

    )
}

// 默认设置
NeoGraph.defaultProps = {
    width:600,
    height:600,
    backgroundColor:"white",
    containerId:"vis"
}

// 数据类型设置
NeoGraph.propTypes = {
    containerId:PropTypes.string,
    neo4jUrl:PropTypes.string.isRequired,
    neo4jAccount:PropTypes.string.isRequired,
    neo4jPassword:PropTypes.string.isRequired,
    backgroundColor:PropTypes.string
}

export default NeoGraph;
