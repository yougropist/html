import React, {Component} from 'react';
// import XLSX from "xlsx";
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import DetailFiche from '../DetailFiche/DetailFiche';
import excelIcon from '../../assets/img/excel.png';
import icon1 from '../../assets/img/icone/1.png';
import icon2 from '../../assets/img/icone/2.png';
import icon3 from '../../assets/img/icone/3.png';
import icon4 from '../../assets/img/icone/4.png';
import icon5 from '../../assets/img/icone/5.png';
import icon6 from '../../assets/img/icone/6.png';
import icon7 from '../../assets/img/icone/7.png';
import icon8 from '../../assets/img/icone/8.png';
import icon9 from '../../assets/img/icone/9.png';
import icon10 from '../../assets/img/icone/10.png';
import icon11 from '../../assets/img/icone/11.png';
import icon12 from '../../assets/img/icone/12.png';
import icon13 from '../../assets/img/icone/13.png';
import icon14 from '../../assets/img/icone/14.png';
import icon15 from '../../assets/img/icone/15.png';
import icon16 from '../../assets/img/icone/16.png';
import icon17 from '../../assets/img/icone/17.png';
import icon18 from '../../assets/img/icon/1y.png';
import icon19 from '../../assets/img/icon/2y.png';
import icon20 from '../../assets/img/icon/3y.png';
import icon21 from '../../assets/img/icon/4y.png';
import icon22 from '../../assets/img/icon/5y.png';
import icon23 from '../../assets/img/icon/6y.png';
import icon24 from '../../assets/img/icon/7y.png';
import icon25 from '../../assets/img/icon/8y.png';
import icon26 from '../../assets/img/icon/9y.png';
import icon27 from '../../assets/img/icon/10y.png';
import icon28 from '../../assets/img/icon/11y.png';
import icon29 from '../../assets/img/icon/12y.png';
import icon30 from '../../assets/img/icon/13y.png';
import icon31 from '../../assets/img/icon/14y.png';
import icon32 from '../../assets/img/icon/15y.png';
import icon33 from '../../assets/img/icon/16y.png';
import icon34 from '../../assets/img/icon/17y.png';
import icon35 from '../../assets/img/icon/18y.png';
import icon36 from '../../assets/img/icon/19y.png';
import icon37 from '../../assets/img/icon/20y.png';
import icon1a from '../../assets/img/icone/1a.png';
import icon2a from '../../assets/img/icone/2a.png';
import icon3a from '../../assets/img/icone/3a.png';
import icon4a from '../../assets/img/icone/4a.png';
import icon5a from '../../assets/img/icone/5a.png';
import icon6a from '../../assets/img/icone/6a.png';
import icon7a from '../../assets/img/icone/7a.png';
import icon8a from '../../assets/img/icone/8a.png';
import icon9a from '../../assets/img/icone/9a.png';
import icon10a from '../../assets/img/icone/10a.png';
import icon11a from '../../assets/img/icone/11a.png';
import icon12a from '../../assets/img/icone/12a.png';
import icon18a from '../../assets/img/icon/1x.png';
import icon19a from '../../assets/img/icon/2x.png';
import icon20a from '../../assets/img/icon/3x.png';
import icon21a from '../../assets/img/icon/4x.png';
import icon22a from '../../assets/img/icon/5x.png';
import icon23a from '../../assets/img/icon/6x.png';
import icon24a from '../../assets/img/icon/7x.png';
import icon25a from '../../assets/img/icon/8x.png';
import icon26a from '../../assets/img/icon/9x.png';
import icon27a from '../../assets/img/icon/10x.png';
import icon28a from '../../assets/img/icon/11x.png';
import icon29a from '../../assets/img/icon/12x.png';
import icon30a from '../../assets/img/icon/13x.png';
import icon31a from '../../assets/img/icon/14x.png';
import icon32a from '../../assets/img/icon/15x.png';
import icon33a from '../../assets/img/icon/16x.png';
import icon34a from '../../assets/img/icon/17x.png';
import icon35a from '../../assets/img/icon/18x.png';
import icon36a from '../../assets/img/icon/19x.png';
import icon37a from '../../assets/img/icon/20x.png';
import icon15a from '../../assets/img/icone/15a.png';
import icon16a from '../../assets/img/icone/16a.png';
import icon17a from '../../assets/img/icone/17a.png';
import icon16b from '../../assets/img/icone/16b.png';
import './style.css';


class PanelGroupes extends Component  {

    constructor(props){
        super(props);
        this.state = {
          dataGroupeIndex: [],
          copie: '',
          copied: false,
          sousGroupe:[],
          checked: [],
          value: "",
          updateOn: "",
          delOn: "",
          delFiche: false,
          delOnFiche: "",
          moveOut: "",
          moveOn: "",
          moveFiche: "",
          moveGroupe: false,
          selected: 0,
          path: [],
          nomFiche: [],
          detailFiche: '',
          idFiche: '',
          champs: [],
          updateFiche: false,
          addGroupe: false,
          newIcon: icon1,
          updateIcon: icon1,
          addFiche: '',
          openAddFiche: false,
          moveStatus: false,
          addFG: "groupe",
          descFr: "",
          descNl: "",
          ifDetailFiche: false,
          i: '',
          listIcon: [
            icon1,
            icon2,
            icon3,
            icon4,
            icon5,
            icon6,
            icon7,
            icon8,
            icon9,
            icon10,
            icon11,
            icon12,
            icon18,
            icon19,
            icon20,
            icon21,
            icon22,
            icon23,
            icon24,
            icon25,
            icon26,
            icon27,
            icon28,
            icon29,
            icon30,
            icon31,
            icon32,
            icon33,
            icon34,
            icon35,
            icon36,
            icon37,
          ],
          listIcona: [
            icon1a,
            icon2a,
            icon3a,
            icon4a,
            icon5a,
            icon6a,
            icon7a,
            icon8a,
            icon9a,
            icon10a,
            icon11a,
            icon12a,
            icon18a,
            icon19a,
            icon20a,
            icon21a,
            icon22a,
            icon23a,
            icon24a,
            icon25a,
            icon26a,
            icon27a,
            icon28a,
            icon29a,
            icon30a,
            icon31a,
            icon32a,
            icon33a,
            icon34a,
            icon35a,
            icon36a,
            icon37a,
          ],
          listIconPanel: [
            icon13,
            icon14,
            icon15,
            icon16,
            icon17
          ],
          listIconPanela: [
            icon15a,
            icon16a,
            icon17a,
            icon16b,
          ]
        }
      }

      // componentDidUpdate(prevProps, prevState) {
      //   if(this.state.selected !== prevState.selected && this.state.selected !== 0){
      //     console.log("REACT UPDATE ARBRE PANEL", this.state.selected )
      //     fetch('/path', {
      //       method: 'POST',
      //       headers: new Headers({
      //           'Content-Type': 'application/json',
      //       }),
      //       body: JSON.stringify({
      //         id: this.state.selected
      //       }),
      //     })
      //     .then((res) => {
      //       if (res.status === 200) {
      //         // console.log('correct: ',res.status)
      //         return res.json()
      //       } 
      //       else {
      //         console.log('error: ',res.status)
      //         return null
      //       }
      //     })
      //     .then(data => {
      //       this.setState((prevState => ({path: [...prevState.path, data[0]]})))
      //       // console.log('data :', data)
      //     })
      //   }
      // }

    
      componentDidMount() {
        if(!window.redirect) {window.location.href='/'}  
        // console.log("REACT SELECT ALL GROUPE")
        fetch('/allGroupe')
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          // console.log(this.state.dataGroupeIndex)
          this.setState({dataGroupeIndex: data})
        })            
      }

      delGroupe(id, index) {
        // console.log("REACT DELETE GROUPE: ", id , index)
        fetch('/delGroupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: id
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          // console.log('data :', data)   
          this.setState({dataGroupeIndex: data, delOn: ""}) 
        })
      }

      updateGroupe(id, index, icon) {
        // console.log("REACT UPDATE GROUPE: ", id)
        this.setState({updateOn: ""})
        fetch('/updateGroupe', {
          method: 'PUT',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            data: {
              id: id,
              nom:this.refs[`nom${index}`].value,
              nomNl:this.refs[`nomNl${index}`].value,
              icon:icon
            }
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          // console.log('data :', data)
          this.setState({dataGroupeIndex: data})
        })
      }

      addGroupe(nom, nomNl, icon ,id, descFr, descNl) {
        // console.log(this.state.addFG, 4)
        this.setState({addGroupe: false, addFG: "groupe"})
        // console.log(this.state.addFG, 5)
        // console.log("REACT SELECT SOUS GROUPE: ", nom, nomNl, icon,id)
        if(id === 0) {
          fetch('/addGroupe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                nom: nom,
                nomNl: nomNl,
                icon: icon,
                descFr: descFr,
                descNl: descNl
            }),
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log('correct: ',res.status)
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            // console.log('data add groupe: ', data)
            this.setState({dataGroupeIndex: data, newIcon: icon1})
          })
        } else {
          fetch('/addSousGroupe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                nom: nom,
                nomNl: nomNl,
                icon: icon,
                id: id
            }),
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log('correct: ',res.status)
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            // console.log('data add sous groupe: ', data)
            this.setState({dataGroupeIndex: data})
          })
        }
        
      }

      selectSousGroupe(id){
        console.log("selectSousGroupe: ", id)
        fetch('/selectSousGroupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: id
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          // console.log('data :', data)   
          this.setState({dataGroupeIndex: data, moveOn: ""}) 
        })
      }
      
      moveGroupe(moveOn, elemId) {
        // console.log("movestatus:",this.state.moveStatus ,"moveGroupe:", this.state.moveGroupe)
        if(this.state.moveStatus === true && this.state.moveGroupe === false){
          // console.log("Move FICHE id: ",this.state.moveFiche,"  - id new Groupe :", elemId)
          this.setState({moveStatus: false})
          fetch('/moveFiche', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
              idFiche: this.state.moveFiche,
              idGroupe: elemId
            }),
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log('correct: ',res.status)
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            console.log('data :', data)   
            if(data === false ){
              window.alert('Ce groupe contient des sous groupes !')
              this.setState({moveGroupe: false, moveOn: "", moveStatus: false, moveFiche: ""})
            } else {
              this.setState({moveGroupe: false, moveOn: "", moveStatus: false, moveFiche: ""}) 
            }
          })
        }else {
          if(moveOn !== "" ) {
            if(moveOn !== elemId){
              // console.log("Move groupe | enfant: ", this.state.moveOn,"parent: ", elemId)

              fetch('/moveGroupe', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  enfant: moveOn,
                  parent: elemId
                }),
              })
              .then((res) => {
                if (res.status === 200) {
                  // console.log('correct: ',res.status)
                  return res.json()
                } 
                else {
                  console.log('error: ',res.status)
                  return null
                }
              })
              .then(data => {
                // console.log('data :', data)
                if(data === false){
                  window.alert('Ce groupe contient des fiches !');
                } else {
                  this.setState({dataGroupeIndex: data, moveOn: "", moveGroupe: false}) 
                }  
               
              })
            } else {
              this.setState({moveOn: "", moveGroupe: false}) 
            }
          } else {
            // console.log("Move groupe on: ", this.state.moveOn,"out: ", elemId)
            this.setState({moveOn: elemId, moveGroupe: true})
          } 
        }
               
      }

      

      openGroupe(){        
        this.setState({updateIcon: icon1})
        fetch('/verifyChild', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: this.state.selected
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {            
          // console.log("data: ", data.resp)       
          if(data.info === "groupe"){
            this.setState({sousGroupe: data.resp ,addFG: data.info})
          } else if(data.info === "none") {
            this.setState({sousGroupe: data.resp ,addFG: data.info})
          } else if(data.info === "fiche"){
            // console.log('data nomFiche: ', data.resp)
            this.setState({nomFiche: data.resp, addFG: data.info})
          } else {
            this.setState({sousGroupe: data.resp})
          }
        })
        fetch('/selectDescGroupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: this.state.selected
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          // console.log('data :', data[0])   
          this.setState({descFr: data[0].descriptionGroupeFr, descNl: data[0].descriptionGroupeNl}) 
        })    
      }

      

      ficheDetail(id){
        this.setState({idFiche: id})
        this.getChamps()
        // console.log("REACT SELECT DETAIL FICHE: ", id)
        fetch('/selectFiche', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: id
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          console.log('data :', data)   
          this.setState({detailFiche: data, ifDetailFiche: true}) 
        })
        
    }

    getChamps(){
      fetch('/champs')
      .then((res) => {
      if (res.status === 200) {
          // console.log('correct: ',res.status)
          return res.json()
      } 
      else {
          console.log('error: ',res.status)
          return null
      }
      })
      .then(data => {
      // console.log('data champs :', data) 
      this.setState({champs: data}) 
      })
    }

    refreshPath(index, id){
      // console.log(id, index, this.state.path,999)
      if(id === this.state.selected) {
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array, selected: id, detailFiche: [],updateFiche: false, openAddFiche: false, ifDetailFiche: false })        
      } else {
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array, selected: id, nomFiche: [], detailFiche: [],updateFiche: false , addFG: "groupe", openAddFiche: false, ifDetailFiche: false})
      }
    }

    openAddFiche(){
      this.setState({openAddFiche: true})
      this.getChamps()      
    }


    addFiche(){
      const arrayChamps = []
      const arrayValue = []
      this.state.champs.map((elem, index) => {
        const champs = "a"+this.state.champs[index].id
        const value = document.getElementById(this.state.champs[index].nom).value
        arrayChamps.push(champs)
        arrayValue.push(value)
      })    
      // console.log("ARRAY CHAMP ",arrayChamps)
      // console.log("ARRAY VALUE ",arrayValue)
      fetch('/addFiche', {        
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          champs: arrayChamps,
          value: arrayValue,
          idGroupe: this.state.selected
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        console.log('data champs :', data) 
        this.setState({nomFiche: data, openAddFiche: false})
      })
    }

    ficheUpdate(index, idGroupe) {
      const value = document.getElementById('a'+this.state.champs[index].id).value
      const champs ='a'+this.state.champs[index].id
      console.log("REACT UPDATE FICHE: ",champs ,value)
      this.setState({updateOn: ""})
      fetch('/refreshFiches', {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id: this.state.idFiche,
          champs: champs,
          value: value,
          idGroupe: idGroupe
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        // console.log('data :', data)  
        this.setState({nomFiche: data})
        
      })
    }

    moveFiche(idFiche, moveFiche){
      // console.log(idFiche, moveFiche)
      if(this.state.moveGroupe === false){
        if(idFiche !== moveFiche){
          this.setState({moveStatus: true, moveFiche: idFiche}     )
          
        } else {          
          this.setState({moveStatus: false, moveFiche: "-"}
          )                   
        } 
      }else{
        window.alert("Veuillez choisir un groupe destinataire valide");
      }
          
    }

    delFiche(id){
      fetch('/delFiche', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id: id,
          idGroupe: this.state.selected
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        // console.log('data :', data)  
        this.setState({delOnFiche: "", nomFiche: data})        
      })
    }

    updateDescGroup(newDescFr, newDescNl){
      console.log('update desc groupe', newDescFr, newDescNl)
      fetch('/updateDescGroupe', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id: this.state.selected,
          descFr: newDescFr,
          descNl: newDescNl
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        // console.log('data :', data)  
        // this.setState({descFr: "", descNl: data})        
      })
    }
    
    extractExcel(id){
      if(id === this.state.selected) {
        let csvContent = "data:text/csv;charset=utf-8,NOM;NOM2;NOM3;THEME1;THEME2;THEME3;THEME4;THEME5;PUBLIC1;PUBLIC2;PUBLIC3;PUBLIC4;PUBLIC5;LANGUE;TYPE;NBR PLACE;ADRESSE;CP;LOCALITE;TEL1;TEL2;GSM1;GSM2;FAX;EMAIL;WEB;SERVICE;AGEMIN;AGEMAX;DESC\r\n\r\n";
        this.state.nomFiche.map((elem, index) => {
          csvContent += elem.a1+";"+elem.a2+";"+elem.a3+";"+elem.a4+";"+elem.a5+";"+elem.a6+";"+elem.a7+";"+elem.a8+";"+elem.a9+";"+elem.a10+";"+elem.a11+";"+elem.a12+";"+elem.a13+";"+elem.a14+";"+elem.a15+";"+elem.a16+";"+elem.a17+";"+elem.a18+";"+elem.a19+";"+elem.a20+";"+elem.a21+";"+elem.a22+";"+elem.a23+";"+elem.a24+";"+elem.a25+";"+elem.a26+";"+elem.a27+";"+elem.a28+";"+elem.a29+";"+elem.a30+";\r\n";
        }); 
        var encodedUri = encodeURI(csvContent);    
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); 
        console.log(link);
        link.click();
      } else {
        // console.log(id)
        fetch('/selectFiche', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: id
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {
          // console.log('data :', data)   
          this.setState({detailFiche: data, ifDetailFiche: false}) 
        })        

        if(this.state.detailFiche.a1 !== undefined){
          let csvContent = "data:text/csv;content:charset=utf-8,NOM;NOM2;NOM3;THEME1;THEME2;THEME3;THEME4;THEME5;PUBLIC1;PUBLIC2;PUBLIC3;PUBLIC4;PUBLIC5;LANGUE;TYPE;NBR PLACE;ADRESSE;CP;LOCALITE;TEL1;TEL2;GSM1;GSM2;FAX;EMAIL;WEB;SERVICE;AGEMIN;AGEMAX;DESC\r\n\r\n";

          csvContent +=         
          this.state.detailFiche.a1+";"
          +this.state.detailFiche.a2+";"
          +this.state.detailFiche.a3+";"
          +this.state.detailFiche.a4+";"
          +this.state.detailFiche.a5+";"
          +this.state.detailFiche.a6+";"
          +this.state.detailFiche.a7+";"
          +this.state.detailFiche.a8+";"
          +this.state.detailFiche.a9+";"
          +this.state.detailFiche.a10+";"
          +this.state.detailFiche.a11+";"
          +this.state.detailFiche.a12+";"
          +this.state.detailFiche.a13+";"
          +this.state.detailFiche.a14+";"
          +this.state.detailFiche.a15+";"
          +this.state.detailFiche.a16+";"
          +this.state.detailFiche.a17+";"
          +this.state.detailFiche.a18+";"
          +this.state.detailFiche.a19+";"
          +this.state.detailFiche.a20+";"
          +this.state.detailFiche.a21+";"
          +this.state.detailFiche.a22+";"
          +this.state.detailFiche.a23+";"
          +this.state.detailFiche.a24+";"
          +this.state.detailFiche.a25+";"
          +this.state.detailFiche.a26+";"
          +this.state.detailFiche.a27+";"
          +this.state.detailFiche.a28+";"
          +this.state.detailFiche.a29+";"
          +this.state.detailFiche.a30+";";          
          var encodedUri = encodeURI(csvContent);    
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "my_data.csv");
          document.body.appendChild(link); 
          console.log(link);
          link.click();
        } 
      }
    }

    // checked(obj){
    //   if(obj.checked){
    //     this.setState(prevState => ({
    //       checked: [...prevState.checked, obj.id]
    //     }))
    //   } else {
    //     const array = this.state.checked.filter(elem => elem !== obj.id)
    //     // console.log(array, 44)
    //     this.setState({checked: array})
    //   }                
    // }

    copie(idFiche, idGroupe){
      console.log("copie fiche: ",idFiche, " vers groupe: ",idGroupe)
      fetch('/copieFiche', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          idFiche: idFiche,
          idGroupe: idGroupe
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        console.log('data :', data)   
        this.setState({copied: true})
        // this.setState({detailFiche: data, ifDetailFiche: false}) 
      }) 
    }

    render(){
      // console.log(this.state.detailFiche, this.state.champs, "test", 9898)
      // console.log("state :\n", this.state)
        return(
          <div>
            <Navbar />
            <Navigation />
              <div id="page-wrapper">
                <div id="page-inner">
                  <div className="row text-center">
                  <h2>PANEL DE GESTION DES GROUPES</h2>
                  <div style={{marginBottom: 50}}>
                      <button className={`btn ${this.state.openAddFiche === true ? " btn-danger" : " btn-primary"}`}  disabled={this.state.addFG === "fiche" && this.state.updateFiche === false || this.state.addFG === "none" && this.state.updateFiche === false && this.state.addGroupe === false ? false : true} onClick={() => {this.state.openAddFiche === false ? this.openAddFiche() : this.setState({openAddFiche: false}) }}>{this.state.openAddFiche === true ? "Annuler" : "Ajouter fiche"}</button>
                      <button className={`btn ${this.state.addGroupe === true ? " btn-danger" : " btn-primary"}`}  disabled={this.state.addFG === "groupe" && this.state.updateFiche === false || this.state.addFG === "none" && this.state.updateFiche === false && this.state.openAddFiche === false ?  false : true} onClick={() => {this.state.addGroupe === false ? this.setState({addGroupe: true }) : this.setState({addGroupe: false}) }} >{this.state.addGroupe === true ? "Annuler" : "Ajouter groupe"}</button>
                  </div>  
                  <div style={{display : this.state.addGroupe !== false ? "initial" : "none", backgroundColor: '#ddd'}}>
                    <div style={{backgroundColor: 'rgb(243, 243, 243)', padding: 20}}>
                      <h4>Nom du groupe</h4>
                      <input style={{width: '50%', margin: '20px auto'}} className="form-control" required id="nom" ref="nom" type="text" placeholder="Nom" />
                      <input style={{width: '50%', margin: '20px auto'}} className="form-control" required id="nomNl" ref="nomNl" type="text" placeholder="Naam" /><br/>
                      <h4>Description du groupe (FR)</h4>
                      <textarea id="descriptionGroupeFr" style={{width: '50%',height: 100,  margin: '20px auto'}} className="form-control"></textarea><br/>
                      <h4>Description du groupe (NL)</h4>
                      <textarea id="descriptionGroupeNl" style={{width: '50%', height: 100, margin: '20px auto'}} className="form-control"></textarea><br/>
                      <h4>Icon du groupe</h4>
                      <div style={{marginBottom: 20, margin: '0 auto'}}>
                      {
                        this.state.listIcon.map((elem, index) => {
                          return(<><a key={index} onClick={() => {this.setState({newIcon: elem})}} > {this.state.newIcon !== elem ? <img  src={elem} alt="Logo" /> : <img  src={this.state.listIcona[index]} alt="Logo" />}  </a></> )                        
                        }) 
                      }
                      </div>
                      <a className='btn btn-success'  href="#" onClick={() => this.addGroupe(document.getElementById('nom').value, document.getElementById('nomNl').value, this.state.newIcon, this.state.selected, document.getElementById('descriptionGroupeFr').value, document.getElementById('descriptionGroupeNl').value)}>Valider</a>                      
                    </div>
                  </div>  
                  {/* <SearchBar /> */}
                  <ul className="path" style={{borderRadius: 7, backgroundColor: '#f3f3f3' }}>
                    <li className="pathItem" onClick={() => {this.setState({path: [], selected: 0,ifDetailFiche: false, nomFiche: [], detailFiche: [], updateFiche: false , addFG: "groupe", openAddFiche: false, descFr:'', descNl: ''})}}><a href='#'><i className="fa fa-home fa-2x" aria-hidden="true"></i></a></li> 
                    {
                      this.state.path.map((elem, index) => {
                        return( <li key={index} className="pathItem" onClick={ () => {this.refreshPath(index, elem.id)} }> <a href='#'>{elem.nom}</a></li>)
                      })
                    }
                  </ul>
                  <div style={{width: '50%', margin: '0 auto', display: this.state.selected !== 0 && this.state.openAddFiche === false && this.state.ifDetailFiche === false ? 'initial' : 'none', backgroundColor: '#eee'}}>
                    <h4>Description du groupe FR</h4>
                    <textarea id='newDescGrpFr' style={{width: '50%', margin: '0 auto'}} className='form-control' value={this.state.descFr} onChange={() => this.setState({descFr: document.getElementById('newDescGrpFr').value})}></textarea>
                    <h4>Description du groupe NL</h4>
                    <textarea id='newDescGrpNl' style={{width: '50%', margin: '0 auto'}} className='form-control' value={this.state.descNl} onChange={() => this.setState({descNl: document.getElementById('newDescGrpNl').value})}></textarea>
                    <button onClick={() => this.updateDescGroup(document.getElementById('newDescGrpFr').value, document.getElementById('newDescGrpNl').value)} className='btn btn-success'>Modifier</button>
                  </div>
                    <ul className="list-group list-champs">
                      <div style={{display : this.state.moveOn !== "" ? "initial" : "none"}}><a onClick={() => this.state.moveOn !== "" ? this.moveGroupe(this.state.moveOn, 0) : this.moveGroupe(this.state.moveOn, 0) } href='#'><i style={{color: "#2bb800"}} className="fa fa-home fa-2x" aria-hidden="true"></i></a></div>     
                      <div>
                            {
                            this.state.nomFiche.length === 0 && this.state.dataGroupeIndex.length > 0 && this.state.openAddFiche === false ? 
                            this.state.dataGroupeIndex.map((elem, index) => {
                              return (
                                <>
                                <li key={index} className={`list-group-item ${elem.id_categorie !== this.state.selected && "hidden" }`} > 
                                  <img src={elem.icon} alt="Logo" />
                                  <input ref={`nom${index}`} className={this.state.updateOn === elem.id ? "active" : undefined} disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nom}/>
                                  <input ref={`nomNl${index}`} className={this.state.updateOn === elem.id ? "active" : undefined } disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nomNl}/>
                                  <div>
                                    {/* {console.log("moveOn: ", this.state.moveOn,"/ moveStatus: ", this.state.moveStatus )} */}
                                    <a className={this.state.updateOn === elem.id ? "green" : "white"} onClick={() => this.state.updateOn !== elem.id ? this.setState({updateOn: elem.id, }) : this.updateGroupe(elem.id, index, this.state.updateIcon) } > {this.state.updateOn !== elem.id ? <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Modifier</i> : <i style={{color: 'white', backgroundColor: 'green', padding: 3, borderRadius: 3}}>Modifier</i> }   </a>
                                    {/* <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => this.state.moveOn !== elem.id ? this.moveGroupe(this.state.moveOn, elem.id) : this.moveGroupe(this.state.moveOn, elem.id) }> {this.state.moveStatus === true && this.state.moveOn !== elem.id  ?  <img  src={this.state.listIconPanela[1]} alt="Logo" /> : this.state.moveOn === "" ? <img  src={this.state.listIconPanel[3]} alt="Logo" /> : this.state.moveOn === elem.id ? <img  src={this.state.listIconPanela[3]} alt="Logo" /> : <img  src={this.state.listIconPanel[3]} alt="Logo" />  }   </a>  */}
                                    <a onClick={() => this.state.moveOn === elem.id 
                                      ? this.moveGroupe(this.state.moveOn, elem.id) 
                                      : this.moveGroupe(this.state.moveOn, elem.id) }> 
                                      {this.state.moveStatus === false && this.state.moveOn === "" 
                                      ? <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Déplacer</i>
                                      : this.state.moveStatus === true && this.state.moveOn === "" 
                                      ? <i style={{color: 'white', backgroundColor: 'green', padding: 3, borderRadius: 3}}>Envoyer</i> 
                                      : this.state.moveOn === elem.id 
                                      ? <i style={{color: 'white', backgroundColor: 'red', padding: 3, borderRadius: 3}}>Annuler</i>
                                      : <i style={{color: 'white', backgroundColor: 'green', padding: 3, borderRadius: 3}}>Envoyer</i> }   </a> 
                                    <a className={this.state.delOn === elem.id ? "green" : "white"} onClick={() => this.state.delOn !== elem.id ?  this.setState({delOn: elem.id}) : this.setState({delOn: ""})}> {this.state.delOn !== elem.id ?  <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Supp.</i> :  <i style={{color: 'white', backgroundColor: 'red', padding: 3, borderRadius: 3}}>Supp.</i>  }</a>
                                    <a className="white" onClick={() => this.setState((prevState => ({path: [...prevState.path, elem], selected: elem.id})), () => {this.openGroupe()} ) } > <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Voir</i>   </a>
                                  </div>
                                </li>
                                <div style={{display: this.state.delOn === elem.id ? "initial" :  "none"}}>
                                  <p>Êtes vous sur?</p>
                                  <button onClick={() => this.delGroupe(elem.id, index) } className="btn btn-success">Oui</button>
                                  <button onClick={() => this.setState({delOn: ""})} className="btn btn-danger">Non</button>
                                </div>
                                <div style={{display: this.state.updateOn === elem.id ? "initial" :  "none"}}>
                                  {
                                    this.state.listIcon.map((elem, index) => {
                                      return(<><a key={index} onClick={() => {this.setState({updateIcon: elem})}} > {this.state.updateIcon !== elem ? <img  src={elem} alt="Logo" /> : <img  src={this.state.listIcona[index]} alt="Logo" />}  </a></> )                        
                                    })
                                  }
                                </div>
                                </>
                              )})
                            :
                            this.state.ifDetailFiche === false && this.state.nomFiche.length > 0 && this.state.openAddFiche === false ?
                            <>
                            <h2>Listes des fiches</h2>
                            <img id='excel' onClick={() => {this.extractExcel(this.state.selected)}} style={{width: 50}} src={excelIcon} alt="Logo" />
                              {this.state.nomFiche.map((elem, index) => {
                                // console.log(this.state.nomFiche, 555)
                                return(
                                  <div key={index}>
                                    <li className="list-group-item" >  
                                      <p style={{textAlign: 'left', width:300}}>{elem.a1}</p>
                                      <p style={{textAlign: 'left', width:100}}>{elem.a18}</p>
                                      <div>
                                        <a onClick={() => this.setState({updateFiche: true}, this.ficheDetail(elem.id)) } >  <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Modifier</i> </a>
                                        <a onClick={() => this.state.moveFiche !== elem.id && this.state.moveGroupe === false
                                          ? this.moveFiche(elem.id, this.state.moveFiche)  
                                          : this.moveFiche(elem.id, this.state.moveFiche)  }> 
                                          {this.state.moveFiche !== elem.id
                                          ? <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Déplacer</i> 
                                          : <i style={{color: 'white', backgroundColor: 'red', padding: 3, borderRadius: 3}}>Annuler</i> } </a> 
                                        <a onClick={() => this.state.delOnFiche !== elem.id ?  this.setState({delOnFiche: elem.id}) : this.setState({delOnFiche: ""})}> {this.state.delOnFiche !== elem.id ?  <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Supp</i> : <i style={{color: 'white', backgroundColor: 'red', padding: 3, borderRadius: 3}}>Supp</i> }</a>
                                        <a onClick={() => this.state.copie !== elem.id ?  this.setState({copie: elem.id, copied: false}) : this.setState({copie: "", copied: false})}> {this.state.copie !== elem.id ?  <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>copie</i> : <i style={{color: 'white', backgroundColor: 'green', padding: 3, borderRadius: 3}}>copie</i> }</a>
                                        <a onClick={() => this.ficheDetail(elem.id) } > <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Voir</i> </a>
                                        <img onClick={() => {this.extractExcel(elem.id)}} style={{width: 40}} src={excelIcon} alt="Logo" />
                                      </div>                                    
                                    </li>
                                    <div style={{display: this.state.delOnFiche === elem.id ? "initial" :  "none"}}>
                                      <p>Êtes vous sur?</p>
                                      <button onClick={() => this.delFiche(elem.id) } className="btn btn-success">Oui</button>
                                      <button onClick={() => this.setState({delOnFiche: ""})} className="btn btn-danger">Non</button>
                                    </div>
                                    <div style={{display: this.state.copie === elem.id ? "initial" :  "none"}}>
                                      <p>Sélectionner un groupe pour y copier la fiche</p>
                                      <ul style={{paddingLeft: 0, marginBottom: 10, maxHeight: 200, scrollBehavior: 'smooth', overflowY: 'scroll'}}>
                                        {this.state.dataGroupeIndex.map((elem, index) => {
                                          return(
                                            <a onClick={() => {this.copie(this.state.copie, elem.id)} } key={index*0.951}><li>{elem.nom} </li></a>                                            
                                          )
                                        })}                                        
                                      </ul>
                                    </div>
                                    <div style={{display: this.state.copied === true && this.state.copie === elem.id ? "initial" :  "none"}}>
                                        <p style={{backgroundColor: 'green', color: 'white', padding: 3, borderRadius: 3}}>La fiche à bien été copié !</p>
                                    </div>
                                  </div>
                                )
                              })}
                              </>
                            :
                            this.state.openAddFiche === true && this.state.updateFiche === false  ?
                            <>
                              {this.state.champs.map((elem, index) => {
                                // console.log(this.state.champs, "la")
                                return (
                                  <li key={index} className="list-group-item">
                                    <h4 style={{fontWeight: 'bold'}}>{this.state.champs[index].nom}</h4>
                                    <textarea className="form-control" style={{backgroundColor: '#fff', width: 500}} id={`${this.state.champs[index].nom}`} type="text" ></textarea>
                                  </li>
                                )
                              })}
                              <a href="#" className="btn btn-success" style={{width: '100%'}} onClick={() => {this.addFiche()} }> Valider</a>
                            </> 
                            :                            
                            this.state.ifDetailFiche === true && this.state.updateFiche === false && this.state.openAddFiche === false ?                    
                              this.state.champs.map((elem, index) => {
                                return this.state.detailFiche[this.state.champs[index].nom] !== '' &&
                                <DetailFiche data={this.state.detailFiche} champs={this.state.champs[index].nom} i={this.state.champs[index].id} /> 
                              })
                            :
                              this.state.champs.map((elem, index) => {
                                // console.log("ici")
                                return (
                                  <li key={index} className="list-group-item">  
                                    <h4 style={{fontWeight: 'bold'}}>{this.state.champs[index].nom}</h4>
                                    <input id={`a${this.state.champs[index].id}`} className={this.state.updateOn === elem.id ? "active" : undefined} disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={this.state.detailFiche["a"+this.state.champs[index].id]}/>
                                    <a onClick={() => this.state.updateOn !== elem.id ? this.setState({updateOn: elem.id}) : this.ficheUpdate(index, this.state.selected) } >{this.state.updateOn === elem.id ?  <i style={{color: 'white', backgroundColor: 'green', padding: 3, borderRadius: 3}}>Confirmer</i> : <i style={{color: 'white', backgroundColor: 'black', padding: 3, borderRadius: 3}}>Modifier</i> }</a>
                                  </li>
                                // <UpdateFiche idFiche={this.state.idFiche} update={this.state.updateFiche} data={this.state.detailFiche}  champsNom={this.state.champs[index].nom} champsId={this.state.champs[index].id} />
                                )
                              })
                            }
                          </div>        
                    </ul>    
                  </div>
                  </div>
                </div>
              <Footer />
            </div>
          
            
        )    
    }
   
}

export default PanelGroupes