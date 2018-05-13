<?php
   echo BatKhien($_GET['token']);
   function BatKhien($token){ 
					    $idfb = json_decode(file_get_contents("https://graph.facebook.com/me?access_token=".$token),true);
							   if(empty($idfb['id']))
												    {
																		   return "Token không hợp lệ";
																			    }
								    else
														   {
																			     $headers2 = array();
																					     $headers2[] = 'Authorization: OAuth '.$token;
																					     $data = 'variables={"0":{"is_shielded":true,"session_id":"9b78191c-84fd-4ab6-b0aa-19b39f04a6bc","actor_id":"'.$idfb['id'].'","client_mutation_id":"b0316dd6-3fd6-4beb-aed4-bb29c5dc64b0"}}&method=post&doc_id=1477043292367183&query_name=IsShieldedSetMutation&strip_defaults=true&strip_nulls=true&locale=en_US&client_country_code=US&fb_api_req_friendly_name=IsShieldedSetMutation&fb_api_caller_class=IsShieldedSetMutation';
																							     $c = curl_init();
																							     curl_setopt($c, CURLOPT_URL, "https://graph.facebook.com/graphql");
																									     curl_setopt($c, CURLOPT_SSL_VERIFYPEER,false);
																									     curl_setopt($c, CURLOPT_SSL_VERIFYHOST,false);
																											     curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);  
																											     curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
																													     curl_setopt($c, CURLOPT_HTTPHEADER, $headers2);
																													     curl_setopt($c,CURLOPT_POST, 1);
																															     curl_setopt($c,CURLOPT_POSTFIELDS,$data);
																															     $page = curl_exec($c);
																																	     curl_close($c);
																																	     return "PuaruVN thành công";
										}
	 }
?>
